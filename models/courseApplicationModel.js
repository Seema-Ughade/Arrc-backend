// models/courseApplicationModel.js
const mongoose = require('mongoose');

const courseApplicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  city: { type: String, required: true },
  courseName: { type: String, required: true },
  mode: { type: String, enum: ['Online', 'Offline'], required: true },
  date: { type: Date, required: true }
}, { timestamps: true });

const CourseApplication = mongoose.model('CourseApplication', courseApplicationSchema);

module.exports = CourseApplication;
