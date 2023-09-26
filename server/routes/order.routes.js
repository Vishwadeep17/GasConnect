// server/routes/order.routes.js

const express = require('express');
const router = express.Router();
const GasOrderController = require('../controllers/gasOrderController');
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');

// Create a new gas order
router.post('/', verifyToken, GasOrderController.createGasOrder);

// Get all gas orders (admin only)
router.get('/', verifyToken, isAdmin, GasOrderController.getAllGasOrders);

// Update gas order status (admin only)
router.put('/update-status', verifyToken, isAdmin, GasOrderController.updateGasOrderStatus);

// Get currently ordered gas for a user
router.get('/currently-ordered', verifyToken, GasOrderController.getCurrentlyOrderedGas);

// Get order history for a user
router.get('/order-history', verifyToken, GasOrderController.getOrderHistory);

module.exports = router;
