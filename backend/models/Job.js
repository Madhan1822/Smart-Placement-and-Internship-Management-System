const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  description: String,

  // 🔥 NEW FIELD
  jobType: {
    type: String,
    enum: ["full-time", "internship"],
    required: true
  },

  requirements: {
    skills: [String],
    minCGPA: { type: Number, default: 0 },
    experience: String
  },

  recruiter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);
