// routes/auth.js
const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const USERS_FILE = path.join(__dirname, "../data/users.json");

// Helper: Load all users
function loadUsers() {
  if (!fs.existsSync(USERS_FILE)) return [];
  const data = fs.readFileSync(USERS_FILE, "utf-8");
  return JSON.parse(data);
}

// Helper: Save users
function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}
// Register
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const users = loadUsers();
    const existing = users.find(user => user.email === email);
    if (existing) {
      return res.status(400).json({ message: "Account already exists." });
    }

    const newUser = { email, password }; // In production: hash the password!
    users.push(newUser);
    saveUsers(users);

    res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Server error." });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const users = loadUsers();
    const user = users.find(u => u.email === email);

    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    res.status(200).json({ message: "Login successful." });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
