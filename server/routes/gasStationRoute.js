const express = require("express");
const { changePassword, getGasStations, getStationWithId, loginStation, registerStation, updateFuel } = require("../controllers/gasStationController.js");

const router=express.Router();

router.post('/register',registerStation);
router.post('/login',loginStation)
router.put('/changePassword',changePassword);
router.put('/updateFuel',updateFuel);
router.get('/getStations',getGasStations);
router.get('/:id', getStationWithId);

module.exports = router;