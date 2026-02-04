const mongoose = require("mongoose");

const studentProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  age: Number,
  personalEmail: String,

  resume: String,        // optional (file name if needed)
  resumeText: String,    // 🔥 REQUIRED FOR AI MATCHING

  skills: [String],
  education: String,
  experience: Number,   // 🔥 REQUIRED
  cgpa: Number,         // 🔥 REQUIRED

  currentOccupation: {
    type: String,
    enum: ["student", "working"]
  }
});

module.exports = mongoose.model("StudentProfile", studentProfileSchema);
