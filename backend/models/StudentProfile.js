// models/StudentProfile.js
const mongoose = require("mongoose");

const studentProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  department: String,
  year: String,
  skills: [String],
  resume: String
});

module.exports = mongoose.model("StudentProfile", studentProfileSchema);
