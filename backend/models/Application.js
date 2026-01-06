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

  // 🔹 AI-ready status
  eligibilityStatus: {
    type: String,
    enum: ["PENDING", "ELIGIBLE", "NOT_ELIGIBLE"],
    default: "PENDING"
  },

  matchedSkills: [String],
  score: { type: Number, default: 0 }

}, { timestamps: true });

module.exports = mongoose.model("Application", applicationSchema);
