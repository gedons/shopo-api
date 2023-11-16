const config = require('../config/config');
const Order = require('../models/Order');
const paystack = require('paystack')(config.PAYSTACK_SECRET_KEY);

exports.initializePayment = async (req, res) => {
  try {
    const { amount, email, reference } = req.body;

    const paymentParams = {
      amount: amount * 100,  
      email,
      reference,
      metadata: {
        custom_fields: [
          {
            display_name: 'Payment for',
            variable_name: 'payment_for',
            value: 'Product purchase' 
          }
        ]
      }
    };

    const payment = await paystack.initializeTransaction(paymentParams);

    res.status(200).json({ payment });
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
