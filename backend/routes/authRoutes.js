// routes/auth.js
const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

router.post("/register", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const existing = await User.findOne({ email });
      if (existing) {
        return res.status(400).json({ message: "Account already exists." });
      }
  
      const newUser = new User({ email, password });
      await newUser.save();
  
      res.status(201).json({ message: "User registered successfully." });
    } catch (err) {
      console.error("Registration error:", err);
      res.status(500).json({ message: "Server error." });
    }
  });

  router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials." });
      }
  
      if (password !== user.password) {
        return res.status(400).json({ message: "Invalid credentials." });
      }
  
      res.status(200).json({ message: "Login successful." });
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ message: "Server error." });
    }
  });
  

module.exports = router;
