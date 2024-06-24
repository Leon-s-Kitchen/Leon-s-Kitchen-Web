const mongoose = require('mongoose');

const outOfDeliveriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  mobileNo: {
    type: String,
    required: true
  },
  items: [
    {
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
      },
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      }
    }
  ],
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
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  versionKey: false, // Disabling the __v field (version key)
  collection: 'outofdeliveries' // Specify the collection name here
});

const OutOfDeliveries = mongoose.model('OutOfDeliveries', outOfDeliveriesSchema);

module.exports = OutOfDeliveries;
