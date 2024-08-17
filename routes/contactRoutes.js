const express = require('express');
const { createContact, getContacts } = require('../controllers/contactController');

const router = express.Router();

// Route to create a new contact entry
router.post('/contact', createContact);

// Route to get all contact entries
router.get('/contacts', getContacts);

module.exports = router;
