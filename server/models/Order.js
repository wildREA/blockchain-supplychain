const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true,
    trim: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    default: 'Created',
    enum: ['Created', 'Processing', 'Shipped', 'Delivered']
  },
  blockchainId: {
    type: String,
    sparse: true
  },
  txHash: {
    type: String,
    sparse: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
