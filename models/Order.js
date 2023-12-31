const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed', 'Shipped', 'Delivered'],
    default: 'Pending',
  },

  paymentReference: {
    type: String, 
  },
  
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
