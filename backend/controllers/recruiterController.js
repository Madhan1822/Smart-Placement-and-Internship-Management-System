const Job = require("../models/Job");
const Application = require("../models/Application");
const RecruiterProfile = require("../models/RecruiterProfile");

exports.getProfile = async (req, res) => {
  try {
    let profile = await RecruiterProfile
      .findOne({ userId: req.user.id })
      .populate("userId", "name email");

    if (!profile) {
      profile = await RecruiterProfile.create({
        userId: req.user.id,
        companyName: "",
        description: ""
      });

      profile = await profile.populate("userId", "name email");
    }

    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { companyName, description } = req.body;

    const profile = await RecruiterProfile.findOneAndUpdate(
      { userId: req.user.id },
      { companyName, description },
      { new: true, upsert: true }
    ).populate("userId", "name email");

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ recruiter: req.user.id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getJobApplicants = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applications = await Application.find({ jobId })
      .populate("studentId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
