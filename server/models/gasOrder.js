const mongoose = require("mongoose");

const gasOrderSchema = new mongoose.Schema({
  orderDate: {
    type: Date,
    default: Date.now,
  },
  deliveryAddress: {
    type: String,
    required: true,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model
    required: true,
  },
  orderStatus: {
    type: String,
    enum: ["Pending", "Processing", "Delivered"], // Add more status options as needed
    default: "Pending",
  },
});

const gasOrder = mongoose.model("GasOrder", gasOrderSchema);

module.exports = gasOrder;
