const express = require("express");
const { initOrder, verifyOrder } = require("../controllers/paymentController.js");

const router=express.Router();

router.post("/order", initOrder);
router.post('/verify',verifyOrder);

module.exports = router;