const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  transactionType: String, // Order Payment, Inventory Purchase, etc.
  amount: Number,
  date: Date,
  relatedEntity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GasOrder', // Can also reference InventoryItem or other entities
  },
  // Other transaction-related fields
});

module.exports = mongoose.model('Transaction', transactionSchema);
