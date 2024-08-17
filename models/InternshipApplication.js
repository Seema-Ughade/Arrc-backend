const mongoose = require('mongoose');

const internshipApplicationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    techSkills: { type: String, required: true },
    mode: { type: String, enum: ['ONLINE', 'OFFLINE'], required: true },
    education: { type: String, required: true },
    cv: { type: String, required: true } // Store the URL of the CV
}, { timestamps: true });

const InternshipApplication = mongoose.model('InternshipApplication', internshipApplicationSchema);

module.exports = InternshipApplication;
