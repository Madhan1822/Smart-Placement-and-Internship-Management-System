const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  description: String,

  // 🔹 NEW: structured requirements
  requirements: {
    skills: [String],
    minCGPA: { type: Number, default: 0 },
    keywords: [String],
    experience: String
  },

  recruiter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required:true
  }
}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);
