const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
    unique: true,
  },
  productId: {
    type: String,
    required: true,
  },
  productTitle: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  billingInfo: {
    firstName: String,
    lastName: String,
    address: String,
    phone: String,
    email: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Payment = mongoose.model('Payment', PaymentSchema);
module.exports = Payment;
