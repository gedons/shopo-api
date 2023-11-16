require('dotenv').config();

module.exports = {
    mongoURI: process.env.mongoURI, 
    SESSION_SECRET: process.env.SESSION_SECRET,
    PAYSTACK_SECRET_KEY: process.env.PAYSTACK_SECRET_KEY
};