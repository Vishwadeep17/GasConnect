const GasOrder = require('../models/gasorder');

// Create a new gas order
exports.createGasOrder = async (req, res) => {
  try {
    const { orderDate, deliveryAddress } = req.body;
    const customer = req.user._id; // Assuming you have implemented user authentication

    // Create a new gas order
    const gasOrder = new GasOrder({
      orderDate,
      deliveryAddress,
      customer,
      orderStatus: 'Pending', // Set the initial status to 'Pending'
    });

    await gasOrder.save();

    res.status(201).json({ message: 'Gas order created successfully', gasOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all gas orders
exports.getAllGasOrders = async (req, res) => {
  try {
    // Retrieve all gas orders
    const gasOrders = await GasOrder.find();

    res.status(200).json({ gasOrders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update gas order status
exports.updateGasOrderStatus = async (req, res) => {
  try {
    const { orderId, newStatus } = req.body;

    // Check if the user has the necessary role to perform this action (e.g., admin or employee)
    if (req.user.role !== 'admin' && req.user.role !== 'employee') {
      return res.status(403).json({ error: 'You do not have permission to update the order status' });
    }

    // Find the gas order by ID
    const gasOrder = await GasOrder.findById(orderId);

    if (!gasOrder) {
      return res.status(404).json({ error: 'Gas order not found' });
    }

    // Update the order status
    gasOrder.orderStatus = newStatus;
    await gasOrder.save();

    res.status(200).json({ message: 'Gas order status updated successfully', gasOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get currently ordered gas (e.g., orders with status "Pending" or "Processing")
exports.getCurrentlyOrderedGas = async (req, res) => {
  try {
    const currentlyOrderedGas = await GasOrder.find({
      customer: req.userId,
      orderStatus: { $in: ["Pending", "Processing"] },
    }).sort({ orderDate: -1 }); // Sort by order date, latest first

    res.status(200).json({ currentlyOrderedGas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get order history (e.g., orders with status "Delivered")
exports.getOrderHistory = async (req, res) => {
  try {
    const orderHistory = await GasOrder.find({
      customer: req.userId,
      orderStatus: "Delivered",
    }).sort({ orderDate: -1 }); // Sort by order date, latest first

    res.status(200).json({ orderHistory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
