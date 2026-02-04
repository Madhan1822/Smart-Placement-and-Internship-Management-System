const mongoose = require("mongoose");

const recruiterSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  companyName: {
    type: String,
    default: ""
  },
  description: {
    type: String,
    default: ""
  },
  companyWebsite: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model("RecruiterProfile", recruiterSchema);
