const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    host: "smtp.titan.email",
    port: 587,
    auth: {
        user:'admin@daeds.uk',
        pass: 'P@xwd2023'
    },
});

module.exports = transporter;
