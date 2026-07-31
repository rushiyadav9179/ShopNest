const express = require('express');
const { protect } = require('../middleware/authMiddleware.js');
const { admin } = require('../middleware/adminMiddlewaew.js');
const { createOrder, getOrders, myOrders, updateOrderStatus } = require('../controllers/orderController.js');

const router = express.Router();

// Create a new order
router.route('/').post(protect, createOrder).get(protect, admin, getOrders);
router.route('/myorders').get(protect, myOrders);
// Get a specific order by ID
router.route('/:id/status').put(protect, admin, updateOrderStatus);

module.exports = router;