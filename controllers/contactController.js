const Contact = require('../models/Contact');

const createContact = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        // Create a new contact entry
        const contact = new Contact({
            name,
            email,
            phone,
            message
        });

        // Save contact to MongoDB
        await contact.save();
        res.status(201).json({ message: 'Contact entry submitted successfully!' });
    } catch (error) {
        console.error('Error submitting contact entry:', error);
        res.status(500).json({ message: 'Failed to submit contact entry. Please try again.' });
    }
};

const getContacts = async (req, res) => {
    try {
        // Retrieve all contact entries
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ message: 'Failed to fetch contacts' });
    }
};

module.exports = {
    createContact,
    getContacts
};
