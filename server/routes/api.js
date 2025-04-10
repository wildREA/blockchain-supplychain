const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Route to create a new order
router.post('/orders', orderController.createOrder);

// Route to get all orders
router.get('/orders', orderController.getOrders);

module.exports = router;