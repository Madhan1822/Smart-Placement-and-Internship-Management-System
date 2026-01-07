const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true
  },

  // 🔹 Recruiter decision status
  status: {
    type: String,
    enum: ["APPLIED", "ACCEPTED", "REJECTED"],
    default: "APPLIED"
  },

  // 🔹 Eligibility logic (AI-ready)
  eligibilityStatus: {
    type: String,
    enum: ["PENDING", "ELIGIBLE", "NOT_ELIGIBLE"],
    default: "PENDING"
  },

  matchedSkills: {
    type: [String],
    default: []
  },

  score: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

module.exports = mongoose.model("Application", applicationSchema);
