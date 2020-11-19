var nodemailer = require('nodemailer');

const mailConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'tanner.yost@ethereal.email',
        pass: 'ssAh3ntjy6QMjPWYZj'
    }
};

module.exports = nodemailer.createTransport(mailConfig);