const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const { verifyToken , isAdmin } = require('../middlewares/authJwt');

// User registration
router.post('/register', AuthController.signup);

// User login
router.post('/login', AuthController.signin);

// Example of a protected route (requires authentication)
router.get('/profile', verifyToken, AuthController.getUserProfile);

// Example of an admin-only route
router.get('/admin', verifyToken, isAdmin, AuthController.adminRoute);

module.exports = router;
