// backend/services/mailer.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

async function notifyContact({ firstName, lastName, email, message }) {
  return transporter.sendMail({
    from: `"Portfolio" <${process.env.SMTP_FROM}>`,
    to: process.env.SMTP_TO,
    subject: `Nouveau message de ${firstName} ${lastName}`,
    text: `Email: ${email}\n\n${message}`,
  });
}

module.exports = { notifyContact };
