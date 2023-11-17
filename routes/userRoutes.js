const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Fetch user profile
router.get('/profile', authMiddleware.verifyToken, userController.getUserProfile);

// Update user profile
router.put('/profile', authMiddleware.verifyToken, userController.updateUserProfile);

// Change password
router.put('/change-password', authMiddleware.verifyToken, userController.changePassword);

// Delete user account
router.delete('/profile', authMiddleware.verifyToken, userController.deleteUserAccount);

// View all users (only accessible to admin)
router.get('/profiles', authMiddleware.verifyToken, userController.viewAllUsers);  


module.exports = router;
