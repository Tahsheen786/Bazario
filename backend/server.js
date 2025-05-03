const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const { connectDB } = require('./config/db');
const app = express(); // ← This is missing!
app.use(cors());
app.use(express.json());
// Connect to MongoDB
connectDB();

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
    const products = await Product.find().limit(10); // Adjust limit as needed
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});




// Register Routes
app.use('/api/auth', authRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
