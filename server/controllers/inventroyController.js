const InventoryItem = require('../models/inventoryItem');

// Add a new item to the inventory
exports.addInventoryItem = async (req, res) => {
  try {
    const { productName, quantity, price, supplier } = req.body;

    // Create a new inventory item
    const inventoryItem = new InventoryItem({
      productName,
      quantity,
      price,
      supplier,
    });

    await inventoryItem.save();

    res.status(201).json({ message: 'Inventory item added successfully', inventoryItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all inventory items
exports.getAllInventoryItems = async (req, res) => {
  try {
    // Retrieve all inventory items
    const inventoryItems = await InventoryItem.find();

    res.status(200).json({ inventoryItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update inventory item details
exports.updateInventoryItem = async (req, res) => {
  try {
    const { itemId, newQuantity, newPrice } = req.body;

    // Check if the user has the necessary role to perform this action (e.g., admin or employee)
    if (req.user.role !== 'admin' && req.user.role !== 'employee') {
      return res.status(403).json({ error: 'You do not have permission to update inventory items' });
    }

    // Find the inventory item by ID
    const inventoryItem = await InventoryItem.findById(itemId);

    if (!inventoryItem) {
      return res.status(404).json({ error: 'Inventory item not found' });
    }

    // Update quantity and price
    inventoryItem.quantity = newQuantity;
    inventoryItem.price = newPrice;
    await inventoryItem.save();

    res.status(200).json({ message: 'Inventory item updated successfully', inventoryItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
