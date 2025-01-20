import nodemailer from 'nodemailer';

const EmailTransporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 2525,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export default EmailTransporter;
