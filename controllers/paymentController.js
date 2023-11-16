//const config = require('../config/config');
const Order = require('../models/Order');
//const paystack = require('paystack')(config.PAYSTACK_SECRET_KEY);

const https = require('https');
const querystring = require('querystring');

exports.initializePayment = async (email, amount) => {
    try {
      const postData = JSON.stringify({
        email,
        amount,
        // Other necessary parameters based on Paystack's API
      });

    const options = {
      hostname: 'api.paystack.co',
      port: 443,
      path: '/transaction/initialize',
      method: 'POST',
      headers: {
        Authorization: 'Bearer sk_test_73d239b922a8dbe050ada4b7f453580c0c8e5a86',
        'Content-Type': 'application/json',
        'Content-Length': postData.length,
      }
    };
    
    return new Promise((resolve, reject) => {
        const payReq = https.request(options, payRes => {
          let data = '';

    payRes.on('data', (chunk) => {
        data += chunk;
      });

      payRes.on('end', () => {
        const paymentInfo = JSON.parse(data);               
        resolve(paymentInfo);
      });
    });

    payReq.on('error', error => {
      console.error(error);
      reject(error);
    });

    payReq.write(postData);
    payReq.end();
  });
  } catch (error) {
    res.status(500).json({ message: 'Failed to initialize payment', error: error.message });
  }
};



exports.handlePaymentWebhook  = async (req, res) => {
    try {
        const eventData = req.body; // Assuming Paystack sends data in the request body
    
        // Extract necessary details such as payment status, order ID, etc.
        const paymentStatus = eventData.status; // Example: extracting payment status
        const orderID = eventData.order_id; // Assuming Paystack sends the order ID
    
        // Retrieve order details from your database using the provided order ID or reference
        const order = await Order.findById(orderID);
    
        if (!order) {
          return res.status(404).json({ message: 'Order not found' });
        }
    
        // Update order status based on payment status received
        if (paymentStatus === 'success') {
          // Set order status as "Paid" if payment was successful
          order.status = 'Paid';
          // Update any other relevant payment-related information in the order
    
          // Save the updated order status to the database
          await order.save();
        } else if (paymentStatus === 'failed') {
          // Handle failed payments - update order status accordingly
          order.status = 'Failed';
          // Handle any other actions for failed payments
    
          // Save the updated order status to the database
          await order.save();
        }
    
        res.status(200).end(); // Respond to Paystack's webhook with a success status
      } catch (error) {
        res.status(500).json({ message: 'Failed to handle Paystack webhook', error: error.message });
      }
};
