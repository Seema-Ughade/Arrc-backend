const express = require('express');
const router = express.Router();
const { saveCourseApplication, getCourseApplications } = require('../controllers/courseController');

// Route to submit course application
router.post('/courseApplications', saveCourseApplication);

// Route to get all course applications
router.get('/courseApplications', getCourseApplications); // Ensure the endpoint is correct

module.exports = router;
