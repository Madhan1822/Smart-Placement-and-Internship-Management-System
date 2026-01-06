// models/RecruiterProfile.js
const mongoose = require("mongoose");

const recruiterSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  companyName: String,
  companyWebsite: String
});

module.exports = mongoose.model("RecruiterProfile", recruiterSchema);
