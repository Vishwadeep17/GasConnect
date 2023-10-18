const express = require("express");
const { acceptOrder, addOrder, getOrderByUserId, cancelOrder, deliveryOrder, getOrders, getOrderByGasStationId } = require("../controllers/orderController.js");

const router=express.Router();

router.route('/')
    .post(addOrder)
    .get(getOrders)

router.get('/getOrderByFuelStationId/:id',getOrderByGasStationId);
router.get('/getOrderByUserId/:id',getOrderByUserId);

router.put('/cancel',cancelOrder);
router.put('/accept',acceptOrder);
router.put('/deliever',deliveryOrder);

module.exports = router;