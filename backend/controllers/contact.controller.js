// backend/controllers/contact.controller.js
const Contact = require('../models/Contact.js');

// petite regex email “raisonnable”
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const { sendMail } = require('../services/mailer.js');

function sanitize(s) {
  return typeof s === 'string' ? s.trim() : '';
}

async function createContact(req, res, next) {
  try {
    const firstName = sanitize(req.body.firstName || req.body.name || '');
    const lastName  = sanitize(req.body.lastName || '');
    const email     = sanitize(req.body.email);
    const message   = sanitize(req.body.message);

    // validations simples
    if (!firstName) return res.status(400).json({ where:'validation', field:'firstName', message:'Prénom requis' });
    if (!lastName)  return res.status(400).json({ where:'validation', field:'lastName',  message:'Nom requis' });
    if (!email || !EMAIL_RE.test(email)) {
      return res.status(400).json({ where:'validation', field:'email', message:'Email invalide' });
    }
    if (!message || message.length < 5) {
      return res.status(400).json({ where:'validation', field:'message', message:'Message trop court' });
    }

    // honeypot anti-bot (champ caché côté front, p.ex. name="website")
    if (req.body.website) {
      return res.status(202).json({ status: 'ignored' }); // on ignore silencieusement
    }

    const doc = await Contact.create({ firstName, lastName, email, message });

     sendMail({ firstName, lastName, email, message })
      .catch(err => console.error('[MAILER]', err.message));

    return res.status(201).json({ status: 'ok', id: doc._id });
  } catch (e) { next(e); }
}



module.exports = { createContact };
