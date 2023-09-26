// server/routes/transaction.routes.js

const express = require('express');
const router = express.Router();
const TransactionController = require('../controllers/transactionController');
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');

// Record a payment transaction (e.g., for orders)
router.post('/record-payment', verifyToken, TransactionController.recordPayment);

// Record a purchase transaction (e.g., for inventory items)
router.post('/record-purchase', verifyToken, TransactionController.recordPurchase);

module.exports = router;
