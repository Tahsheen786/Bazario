// models/User.js
const mongoose = require("mongoose");


// User schema to store user information and all payments
const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
});

module.exports = mongoose.model("User", UserSchema);
