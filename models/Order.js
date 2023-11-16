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
  address: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ['Pending', 'Paid', 'Shipped', 'Delivered'],
    default: 'Pending',
  },
  paymentDetails: {  
    reference: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
     
  },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
