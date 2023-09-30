const express = require('express');
const router = express.Router();
const InventoryController = require('../controllers/inventoryController');
const { verifyToken, isAdmin } = require('../middlewares/authJwt');

// Add a new item to the inventory (admin only)
router.post('/', verifyToken, isAdmin, InventoryController.addInventoryItem);

// Get all inventory items
router.get('/', InventoryController.getAllInventoryItems);

// Update inventory item details (admin only)
router.put('/update-item', verifyToken, isAdmin, InventoryController.updateInventoryItem);

module.exports = router;
