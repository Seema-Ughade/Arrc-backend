// const Contact = require('../models/Contact');

// const createContact = async (req, res) => {
//     try {
//         const { name, email, phone, message } = req.body;

//         // Create a new contact entry
//         const contact = new Contact({
//             name,
//             email,
//             phone,
//             message
//         });

//         // Save contact to MongoDB
//         await contact.save();
//         res.status(201).json({ message: 'Contact entry submitted successfully!' });
//     } catch (error) {
//         console.error('Error submitting contact entry:', error);
//         res.status(500).json({ message: 'Failed to submit contact entry. Please try again.' });
//     }
// };

// const getContacts = async (req, res) => {
//     try {
//         // Retrieve all contact entries
//         const contacts = await Contact.find();
//         res.json(contacts);
//     } catch (error) {
//         console.error('Error fetching contacts:', error);
//         res.status(500).json({ message: 'Failed to fetch contacts' });
//     }
// };

// module.exports = {
//     createContact,
//     getContacts
// };









const Contact = require('../models/Contact');

// Create a new contact entry
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

// Retrieve all contact entries
const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ message: 'Failed to fetch contacts' });
    }
};

// Delete a single contact entry by ID
const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        await Contact.findByIdAndDelete(id);
        res.status(200).json({ message: 'Contact entry deleted successfully!' });
    } catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).json({ message: 'Failed to delete contact' });
    }
};

// Bulk delete contacts by an array of IDs
const bulkDeleteContacts = async (req, res) => {
    try {
        const { ids } = req.body; // Expecting an array of contact IDs in the request body
        await Contact.deleteMany({ _id: { $in: ids } });
        res.status(200).json({ message: 'Selected contacts deleted successfully!' });
    } catch (error) {
        console.error('Error deleting selected contacts:', error);
        res.status(500).json({ message: 'Failed to delete selected contacts' });
    }
};

// Delete all contact entries
const deleteAllContacts = async (req, res) => {
    try {
        await Contact.deleteMany({});
        res.status(200).json({ message: 'All contact entries deleted successfully!' });
    } catch (error) {
        console.error('Error deleting all contacts:', error);
        res.status(500).json({ message: 'Failed to delete all contacts' });
    }
};

module.exports = {
    createContact,
    getContacts,
    deleteContact,
    bulkDeleteContacts,
    deleteAllContacts
};
