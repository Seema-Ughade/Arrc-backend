// const express = require('express');
// const router = express.Router();
// const { saveCourseApplication, getCourseApplications } = require('../controllers/courseController');

// // Route to submit course application
// router.post('/courseApplications', saveCourseApplication);

// // Route to get all course applications
// router.get('/courseApplications', getCourseApplications); // Ensure the endpoint is correct

// module.exports = router;

const express = require('express');
const router = express.Router();
const { 
  saveCourseApplication, 
  getCourseApplications, 
  deleteCourseApplication, // Add deleteCourseApplication
  updateCourseApplication
} = require('../controllers/courseController');

// Route to submit course application
router.post('/courseApplications', saveCourseApplication);

// Route to get all course applications
router.get('/courseApplications', getCourseApplications);

// Route to delete a course application by ID
router.delete('/courseApplications/:id', deleteCourseApplication); // Add delete route


router.put('/courseApplications/:id', updateCourseApplication); // Add edit route

module.exports = router;
