// controllers/courseController.js
const CourseApplication = require('../models/courseApplicationModel');

// Save course application
const saveCourseApplication = async (req, res) => {
  try {
    const application = new CourseApplication(req.body);
    await application.save();
    res.status(201).json({ message: 'Application submitted successfully!' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to submit application.', error });
  }
};

// Get all course applications
const getCourseApplications = async (req, res) => {
  try {
    const applications = await CourseApplication.find();
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch applications.', error });
  }
};

module.exports = {
  saveCourseApplication,
  getCourseApplications
};
