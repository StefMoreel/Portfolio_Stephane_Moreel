// backend/Routes/contact.routes.js
const { Router } = require('express');
const router = Router();
const rateLimit = require('express-rate-limit');
const { createContact } = require('../controllers/contact.controller');

// limite légère: 5 submissions / 5 min par IP
const contactLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/', contactLimiter, createContact);

module.exports = router;
