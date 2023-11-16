
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/initialize-payment', authMiddleware.verifyToken, paymentController.initializePayment);
router.post('/webhook', paymentController.handleWebhook);
 

module.exports = router;