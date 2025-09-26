import nodemailer from 'nodemailer'

const emailConfig = {
    development: {
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER || 'olana0979232206@gmail.com',
            pass: process.env.EMAIL_PASSWORD || 'Oli7923@!',
        }
    },

    production: {
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        }
    }
};

const createTransport = () => {
    const config = emailConfig[process.env.NODE_ENV || 'development'];

    return nodemailer.createTransport({
        ...config,
        secure: process.env.NODE_ENV === 'production',
        tls: {
            rejectUnauthorized: false
        }
    })
};

export default createTransport;