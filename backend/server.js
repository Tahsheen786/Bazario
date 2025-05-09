process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const Payment = require('./models/PaymentSchema'); // Import the Payment model

const express = require('express');
const mongoose = require('mongoose');
const { simpleParser } = require('mailparser');
const Imap = require('imap');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const authRoutes = require('./routes/authRoutes');
const { connectDB } = require('./config/db');
const app = express(); // ← This is missing!
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();
const port = process.env.PORT || 3002;
const server = http.createServer(app);

// Attach Socket.IO to this server
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST']
  }
});

// Start listening using only one server
server.listen(port, () => {
  console.log(`Unified server running on http://localhost:${port}`);
});

let qrGeneratedTime = null;
let lastProcessedUID = null;

// WebSocket connection handler
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);

  });
  socket.on('payment-success', async (data) => {
    
    try {
    const { transactionId, productId, productTitle, amount, billingInfo } = data;

    // Save the payment details to MongoDB
    const payment = new Payment({
      transactionId,
      productId,
      productTitle,
      amount,
      billingInfo,
    });

    await payment.save();
    console.log('Payment details saved successfully');
    
    io.emit('payment-success', { success: true, message: 'Payment Successful, Order Placed' });
  } catch (error) {
    console.error('Error saving payment details:', error);
    io.emit('payment-success', { success: false, message: 'Payment failed to save' });
  }
});
});
// Import your Payment model
const router = express.Router();

// Route to save payment details
router.post('/save-payment', async (req, res) => {
  try {
    const { transactionId, productId, productTitle, amount, billingInfo } = req.body;

    const payment = new Payment({
      transactionId,
      productId,
      productTitle,
      amount,
      billingInfo,
    });

    await payment.save();

    res.status(200).json({ message: 'Payment details saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving payment details', error });
  }
});

module.exports = router;
// Endpoint for generating QR (to notify when QR is generated)
app.post('/generate-qr', (req, res) => {
  qrGeneratedTime = new Date();
  console.log('QR generated at:', qrGeneratedTime);
  res.json({ message: 'QR time noted' });
});

// Endpoint to check payment status by checking emails (IMAP)
app.post('/check-payment', async (req, res) => {
  const { productId, productTitle, amount, billingInfo } = req.body;
  const pollStartTime = new Date();
  const pollEndTime = new Date(pollStartTime.getTime() + 3 * 60 * 1000); // 3-minute polling window
  console.log(`[START] Polling window: ${pollStartTime.toISOString()} - ${pollEndTime.toISOString()}`);

  const imap = new Imap({
    user: 'tahsheenfatima515@gmail.com',
    password: 'vxul fcbf ttgd utay',
    host: 'imap.gmail.com',
    port: 993,
    tls: true
  });

  const checkEmails = () => {
    return new Promise((resolve, reject) => {
      let paymentFound = false;

      imap.once('ready', () => {
        imap.openBox('INBOX', true, (err, box) => {
          if (err) return reject(err);

          const formattedStartTime = pollStartTime.toUTCString();
          const searchCriteria = [
            ['FROM', 'alerts@hdfcbank.net'],
            ['SINCE', formattedStartTime]
          ];

          imap.search(searchCriteria, (err, results) => {
            if (err || !results || results.length === 0) {
              imap.end();
              return resolve(null);
            }

            const f = imap.fetch(results.slice(-10), { bodies: '', markSeen: false });

            f.on('message', (msg) => {
              msg.on('body', (stream) => {
                simpleParser(stream, (err, parsed) => {
                  if (err || paymentFound) return;

                  const sender = parsed.from?.text || '';
                  const emailTime = new Date(parsed.date);
                  const emailBody = parsed.text || parsed.html;

                  if (
                    sender.includes('alerts@hdfcbank.net') &&
                    emailTime >= pollStartTime &&
                    emailTime <= pollEndTime &&
                    emailBody &&
                    parsed.messageId !== lastProcessedUID // Avoid reprocessing the same email
                  ) {
                    const matchRef = emailBody.match(/UPI transaction reference number is (\d+)/);// Save the payment info in MongoDB
                    if (matchRef) {
                      const transactionId = matchRef[1]; 
                     
                    lastProcessedUID = parsed.messageId;  // Save the processed UID to avoid reprocessing
                    paymentFound = true;
                    imap.end();
                    
                    console.log(`[Success] Payment detected. UID saved: ${lastProcessedUID}`);
                    io.emit('payment-success', { success: true, message: 'Payment Successful, Order Placed' });  // Emit event to frontend via socket.io
                    return resolve({ success: true, reference: transactionId, time: emailTime });

                  }else {
      console.log('Transaction ID not found in email.');
                  }
                }
                });
              });
            });

            f.once('end', () => {
              if (!paymentFound) {
                imap.end();
                resolve(null);
              }
            });
          });
        });
      });

      imap.once('error', (err) => {
        console.error('IMAP Error:', err);
        reject(err);
      });

      imap.connect();
    });
  };

  const pollForEmail = async () => {
    let attempt = 1;

    while (new Date() < pollEndTime) {
      console.log(`[Attempt ${attempt}] Checking emails at ${new Date().toISOString()}...`);

      try {
        const result = await checkEmails();
        if (result) {
          console.log(`[Attempt ${attempt}] ✅ Payment email found.`);
          updateQRCode("Payment complete and Order placed"); // Optionally update QR code here
        return res.json({ success: true, message: result.reference }); 
        } else {
          console.log(`[Attempt ${attempt}] ❌ No matching payment email found.`);
        }
      } catch (err) {
        console.error(`[Attempt ${attempt}] ⚠️ Error during email check:`, err.message);
        return res.status(500).json({ message: "Error during email check", error: err.message });
      }

      attempt++;
      await new Promise((resolve) => setTimeout(resolve, 10000)); // 10 seconds delay between checks
    }

    console.log(`[END] Polling completed. No payment email found.`);
    return res.json({ success: false, message: "No payment email found in 3 minutes." });
  };

  return await pollForEmail();
});

const productSchema = new mongoose.Schema({}, { collection: 'handmade_filtered_metadata', strict: false });
const Product = mongoose.model('Product', productSchema);

// Fetch product by ID
app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id); // Mongoose auto-uses the correct collection
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    console.error("Error fetching product by ID:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Endpoint to get products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find().limit(21); // Adjust limit as needed
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});




// Register Routes
app.use('/api/auth', authRoutes);

