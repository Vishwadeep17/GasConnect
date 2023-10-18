const express = require("express");
const { signup, login, getUserInfo, changePassword } = require("../controllers/userController.js");

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.put('/changePassword', changePassword);

router.get('/getUserInfo/:id', getUserInfo);

module.exports = router;
