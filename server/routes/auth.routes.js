const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const getUserProfile = require("../controllers/userController");
const auth = require('../middlewares/authJwt');

// User registration
router.post('/register', AuthController.signup);

// User login
router.post('/login', AuthController.signin);

// Example of a protected route (requires authentication)
router.get('/profile', ()=>{auth.verifyToken()}, getUserProfile);

// Example of an admin-only route
router.get('/admin', ()=>{auth.verifyToken()}, ()=>{auth.isAdmin()}, AuthController.adminRoute);

module.exports = router;