const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require('body-parser');
const config = require('./config/config');

const authRoute = require('./routes/authRoute');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const bannerRoutes = require('./routes/bannerRoutes');
const contactRoutes = require('./routes/contactRoutes');

dotenv.config();


app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }));


mongoose
  .connect(config.mongoURI, {
    w: 1
  })
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log('MongoDb Error: ', err);
  });

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/payment', paymentRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/banner', bannerRoutes);
app.use('/api/v1/contact', contactRoutes);


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Backend server running at port: ${port}`);
});