const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// ⬇️ Load products from JSON instead of MongoDB
const products = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'handmade_filtered_metadata.json'), 'utf-8'));


// ✅ Fetch product by ID from JSON
app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const product = products.find(p => p._id === id); // Match by string ID
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(product);
});

// ✅ Fetch all products from JSON
app.get('/products', (req, res) => {
  res.json(products.slice(0, 10)); // Adjust limit as needed
});

// 👤 Auth routes remain unchanged
app.use('/api/auth', authRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
