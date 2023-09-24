const mongoose = require('mongoose');

const inventoryItemSchema = new mongoose.Schema({
  productName: String,
  quantity: Number,
  price: Number,
  supplier: String,
  // Other inventory-related fields
});

module.exports = mongoose.model('InventoryItem', inventoryItemSchema);