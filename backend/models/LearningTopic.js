const mongoose = require("mongoose");

const learningTopicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  learningLinks: [
    {
      name: String,
      url: String
    }
  ],

  practiceLinks: [
    {
      name: String,
      url: String
    }
  ],

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model("LearningTopic", learningTopicSchema);
