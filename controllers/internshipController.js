


const cloudinary = require('cloudinary').v2;
const InternshipApplication = require('../models/InternshipApplication');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const createApplication = async (req, res) => {
    try {
        const { name, city, mobile, email, techSkills, mode, education } = req.body;
        let cvUrl = '';

        // Upload CV to Cloudinary
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'internship_cvs'
            });
            cvUrl = result.secure_url; // Store the secure URL
        }

        // Create a new internship application
        const application = new InternshipApplication({
            name: name.toUpperCase(),
            city: city.toUpperCase(),
            mobile,
            email: email.toUpperCase(),
            techSkills: techSkills.toUpperCase(),
            mode: mode.toUpperCase(),
            education: education.toUpperCase(),
            cv: cvUrl
        });

        // Save application to MongoDB
        await application.save();
        res.status(201).json({ message: 'Application submitted successfully!' });
    } catch (error) {
        console.error('Error submitting application:', error);
        res.status(500).json({ message: 'Failed to submit application. Please try again.' });
    }
};

const getApplication = async (req, res) => {
    try {
        const applicationId = req.params.id;
        const application = await InternshipApplication.findById(applicationId);

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        res.json(application);
    } catch (error) {
        console.error('Error fetching application:', error);
        res.status(500).json({ message: 'Failed to fetch application' });
    }
};

const getAllApplications = async (req, res) => {
    try {
        // Fetch all internship applications from MongoDB
        const applications = await InternshipApplication.find();
        res.json(applications);
    } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).json({ message: 'Failed to fetch applications' });
    }
};

const deleteApplication = async (req, res) => {
    try {
        // Retrieve the application ID from the request parameters
        const applicationId = req.params.id;

        // Find and delete the application by its ID
        const application = await InternshipApplication.findByIdAndDelete(applicationId);

        // Check if the application was found and deleted
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        // If a CV URL exists, delete it from Cloudinary
        if (application.cv) {
            // Extract the public ID from the CV URL
            const publicId = application.cv.split('/').pop().split('.').shift();
            await cloudinary.uploader.destroy(`internship_cvs/${publicId}`);
        }

        // Respond with a success message
        res.json({ message: 'Application deleted successfully!' });
    } catch (error) {
        // Log the error and respond with an error message
        console.error('Error deleting application:', error);
        res.status(500).json({ message: 'Failed to delete application' });
    }
};

const updateApplication = async (req, res) => {
    try {
        const applicationId = req.params.id;
        const { name, city, mobile, email, techSkills, mode, education } = req.body;
        let cvUrl = '';

        // Check if a new CV file was uploaded
        if (req.file) {
            // Upload new CV to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'internship_cvs'
            });
            cvUrl = result.secure_url; // Store the secure URL
        }

        // Find and update the application by its ID
        const updatedApplication = await InternshipApplication.findByIdAndUpdate(applicationId, {
            name: name.toUpperCase(),
            city: city.toUpperCase(),
            mobile,
            email: email.toUpperCase(),
            techSkills: techSkills.toUpperCase(),
            mode: mode.toUpperCase(),
            education: education.toUpperCase(),
            cv: cvUrl || undefined // Use the new CV URL if provided, otherwise keep existing one
        }, { new: true });

        // Check if the application was found and updated
        if (!updatedApplication) {
            return res.status(404).json({ message: 'Application not found' });
        }

        // Respond with a success message
        res.json({ message: 'Application updated successfully!', application: updatedApplication });
    } catch (error) {
        console.error('Error updating application:', error);
        res.status(500).json({ message: 'Failed to update application' });
    }
};


// Delete multiple internship applications
const deleteallInternshipApplications = async (req, res) => {
    try {
      await InternshipApplication.deleteMany({ _id: { $in: req.body.ids } });
      res.status(200).json({ message: 'Selected applications deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting selected applications', error });
    }
  };
  

module.exports = {
    createApplication,
    deleteallInternshipApplications,
    updateApplication,
    getApplication,
    getAllApplications,
    deleteApplication,
    
};
