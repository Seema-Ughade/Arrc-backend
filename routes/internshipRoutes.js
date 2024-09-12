
// module.exports = router;
const express = require('express');
const multer = require('multer');
const { createApplication, getApplication,deleteallInternshipApplications, getAllApplications, deleteApplication, updateApplication } = require('../controllers/internshipController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Use multer to handle file uploads

// Route to create a new internship application
router.post('/internshipApplications', upload.single('cv'), createApplication);

// Route to get a specific internship application by ID
router.get('/internshipApplications/:id', getApplication);

// Route to get all internship applications
router.get('/internshipApplications', getAllApplications);

// Route to update a specific internship application by ID
router.put('/internshipApplications/:id', upload.single('cv'), updateApplication);

// Route to delete a specific internship application by ID
router.delete('/internshipApplications/:id', deleteApplication);


router.delete('/internshipApplications', deleteallInternshipApplications);


module.exports = router;
