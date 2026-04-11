// This defines the structure of resume data in MongoDB
const mongoose = require('mongoose')

const resumeSchema = new mongoose.Schema({
  // Personal Info
  userId: String,
  fullName: String,
  email: String,
  phone: String,
  location: String,
  linkedin: String,
  github: String,

  // Resume Content
  summary: String,
  skills: String,

  // Dynamic Arrays
  projects: Array,
  experiences: Array,

  // Education
  degree: String,
  college: String,
  eduStart: String,
  eduEnd: String,
  cgpa: String,
  school12: String,
  board12: String,
  year12: String,
  percent12: String,
  school10: String,
  board10: String,
  year10: String,
  percent10: String,

  // Extra
  achievements: String,
  certifications: String,

  // Timestamp - automatically saves when resume was created
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Resume', resumeSchema)