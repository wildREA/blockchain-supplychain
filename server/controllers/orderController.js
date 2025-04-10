const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
    try {
        const { product, quantity, price } = req.body;
        const newOrder = new Order({ product, quantity, price });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving orders', error });
    }
};