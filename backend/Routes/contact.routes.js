const express = require('express');
const router = express.Router();
const { sendContactEmail } = require('../controllers/contact.controller');

// Route POST pour la soumission du formulaire de contact
router.post('/', sendContactEmail);

module.exports = router;
