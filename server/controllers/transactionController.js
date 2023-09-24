const Transaction = require('../models/transaction');

// Record a payment transaction
exports.recordPayment = async (req, res) => {
  try {
    const { transactionType, amount, relatedEntity } = req.body;

    // Create a new payment transaction
    const transaction = new Transaction({
      transactionType,
      amount,
      relatedEntity,
      date: new Date(),
    });

    await transaction.save();

    res.status(201).json({ message: 'Payment transaction recorded successfully', transaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Record a purchase transaction (e.g., for inventory items)
exports.recordPurchase = async (req, res) => {
  try {
    const { transactionType, amount, relatedEntity } = req.body;

    // Create a new purchase transaction
    const transaction = new Transaction({
      transactionType,
      amount,
      relatedEntity,
      date: new Date(),
    });

    await transaction.save();

    res.status(201).json({ message: 'Purchase transaction recorded successfully', transaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
