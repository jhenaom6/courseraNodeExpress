const nodemailer = require('nodemailer');
const sgtransport = require('nodemailer-sendgrid-transport');

let mailConfig;

if(process.env.NODE_ENV === 'production'){

    const options = {
        auth: {
            api_key: process.env.SENDGRID_API_SECRET
        }
    }
    
    mailConfig = sgtransport(options);

} else {
    //ambiente de servidor de pruebas
    if(process.env.NODE_ENV === 'staging') {

        log('::::: STAGING ::::::');
        const options = {
            auth: {
                api_key: process.env.SENDGRID_API_SECRET
            }
        }

        mailConfig = sgtransport(options);

    } else {

        mailConfig = {
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: process.env.ETHEREAL_USER,
                pass: process.env.ETHEREAL_PASS
            }
        };
        
    }
}

module.exports = nodemailer.createTransport(mailConfig);
