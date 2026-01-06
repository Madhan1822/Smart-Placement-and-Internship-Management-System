// models/Application.js
const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
  status: {
    type: String,
    enum: ["applied", "shortlisted", "rejected"],
    default: "applied"
  }
}, { timestamps: true });

module.exports = mongoose.model("Application", applicationSchema);
