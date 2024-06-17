const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: String, // Assuming user's email is a string
    required: true
  },
  name: {
    type: String, // User's name
    required: true
  },
  mobileNo: {
    type: String, // User's mobile number
    required: true
  },
  items: [{
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  deliveryFee: {
    type: Number,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
