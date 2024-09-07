// const express = require('express');
// const { createContact, getContacts } = require('../controllers/contactController');

// const router = express.Router();

// // Route to create a new contact entry
// router.post('/contact', createContact);

// // Route to get all contact entries
// router.get('/contacts', getContacts);

// module.exports = router;


const express = require('express');
const {
    createContact,
    getContacts,
    deleteContact,
    bulkDeleteContacts,
    deleteAllContacts
} = require('../controllers/contactController');

const router = express.Router();

// Route to create a new contact entry
router.post('/contact', createContact);

// Route to get all contact entries
router.get('/contacts', getContacts);

// Route to delete a single contact by ID
router.delete('/contacts/:id', deleteContact);

// Route to bulk delete selected contacts
router.post('/contacts/bulk-delete', bulkDeleteContacts);

// Route to delete all contact entries
router.delete('/contacts', deleteAllContacts);

module.exports = router;
