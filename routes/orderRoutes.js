// routes/orderRoutes.js

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

// Place an order
router.post('/place-order', authMiddleware.verifyToken, orderController.placeOrderAndInitiatePayment );

// Get all orders for a user
router.get('/user-orders', authMiddleware.verifyToken, orderController.getUserOrders);

// Get all orders (for admin)
router.get('/all-orders', authMiddleware.verifyToken, orderController.getAllOrders);

// Update order status (for admin)
router.put('/update-status', authMiddleware.verifyToken, orderController.updateOrderStatus);

// Delete an order (for admin)
router.delete('/delete-order/:orderId', authMiddleware.verifyToken, orderController.deleteOrder);

// Calculate monthly income
router.get('/monthly-income', authMiddleware.verifyToken, orderController.getMonthlyIncome);

module.exports = router;
