const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require('body-parser');
const config = require('./config/config');

const authRoute = require('./routes/authRoute');
// const userRoute = require('./routes/userRoute');
// const productRoute = require('./routes/productRoute');
// const cartRoute = require('./routes/cartRoute');
// const orderRoute = require('./routes/orderRoute');
// const stripeRoute = require('./routes/stripeRoute');


dotenv.config();


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose
  .connect(config.mongoURI)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log('MongoDb Error: ', err);
  });

app.use('/api/v1/auth', authRoute);
// app.use('/api/v1/users', userRoute);
// app.use('/api/v1/products', productRoute);
// app.use('/api/v1/carts', cartRoute);
// app.use('/apiv1//orders', orderRoute);
// app.use('/api/v1/checkout', stripeRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Backend server running at port: ${port}`);
});