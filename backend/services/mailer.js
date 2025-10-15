// services/mailer.js
const nodemailer = require('nodemailer');

function createTransport({ port, secure }) {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,           // smtp.gmail.com
    port,                                  // 587 ou 465
    secure,                                // 587:false, 465:true
    requireTLS: port === 587,              // STARTTLS pour 587
    auth: {
      user: process.env.SMTP_USER,         // ton Gmail complet
      pass: process.env.SMTP_PASS,         // MOT DE PASSE D’APPLICATION
    },
    family: 4,                             // force IPv4
    connectionTimeout: 15000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
    tls: {
      minVersion: 'TLSv1.2',
      servername: process.env.SMTP_HOST,
      rejectUnauthorized: true,
    },
    pool: false,
    logger: true,
    debug: true,
  });
}

async function sendMail({ to, subject, html, text, replyTo }) {
  // essai 1: 587/STARTTLS
  let t = createTransport({ port: 587, secure: false });
  try {
    await t.verify();
    return await t.sendMail({
      from: process.env.SMTP_FROM, to, subject, html, text, replyTo,
    });
  } catch (e1) {
    console.error('[MAILER] 587 failed:', e1 && e1.message);
    // essai 2: 465/SSL
    t = createTransport({ port: 465, secure: true });
    await t.verify();
    return await t.sendMail({
      from: process.env.SMTP_FROM, to, subject, html, text, replyTo,
    });
  }
}

module.exports = { sendMail };

