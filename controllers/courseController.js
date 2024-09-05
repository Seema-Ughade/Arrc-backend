// const CourseApplication = require('../models/CourseApplication');

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

// Delete a course application by ID
const deleteCourseApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await CourseApplication.findByIdAndDelete(id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found.' });
    }
    res.status(200).json({ message: 'Application deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete application.', error });
  }
};

const updateCourseApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const application = await CourseApplication.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });

    if (!application) {
      return res.status(404).json({ message: 'Application not found.' });
    }

    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update application.', error });
  }
};


module.exports = {
  saveCourseApplication,
  getCourseApplications,
  deleteCourseApplication,
  updateCourseApplication,
};
