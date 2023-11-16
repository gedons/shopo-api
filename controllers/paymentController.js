//const config = require('../config/config');
const Order = require('../models/Order');
//const paystack = require('paystack')(config.PAYSTACK_SECRET_KEY);

const https = require('https');
const querystring = require('querystring');

exports.initializePayment = async (req, res) => {
  try {
    const { email, amount } = req.body;  
    const postData = JSON.stringify({
      email,
      amount,
       
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

    const payReq = https.request(options, payRes => {
      let data = '';

      payRes.on('data', (chunk) => {
        data += chunk;
      });

      payRes.on('end', () => {
        console.log(JSON.parse(data));
        res.status(200).json({ payment: JSON.parse(data) });
      });
    });

    payReq.on('error', error => {
      console.error(error);
      res.status(500).json({ message: 'Failed to initialize payment', error: error.message });
    });

    payReq.write(postData);
    payReq.end();
  } catch (error) {
    res.status(500).json({ message: 'Failed to initialize payment', error: error.message });
  }
};



exports.handleWebhook = async (req, res) => {
  try {
    const { event, data } = req.body;

    if (event === 'charge.success') {
      const { reference, amount } = data;

      // Save payment details to the Order model
      const order = await Order.findOneAndUpdate(
        { 'paymentDetails.reference': reference },
        { $set: { 'paymentDetails.amount': amount, status: 'Paid', 'paymentDetails': data } },
        { new: true }
      );

      if (!order) {
        // Handle cases when the order is not found
        // Create a new order with payment details
        const newOrder = new Order({
          user: req.user, // Assuming the user ID is available in the request
          totalPrice: amount, // Adjust this according to your use case
          status: 'Paid',
          paymentDetails: data,
          // Add other necessary fields
        });
        await newOrder.save();
      }

      res.status(200).json({ message: 'Payment processed successfully' });
    } else {
      res.status(200).json({ message: 'Event not handled' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to process webhook event', error: error.message });
  }
};
