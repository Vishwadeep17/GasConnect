// server/routes/auth.routes.js

const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');

// User registration
router.post('/register', AuthController.register);

// User login
router.post('/login', AuthController.login);

// Example of a protected route (requires authentication)
router.get('/profile', verifyToken, AuthController.getProfile);

// Example of an admin-only route
router.get('/admin', verifyToken, isAdmin, AuthController.adminRoute);

module.exports = router;
