const Job = require("../models/Job");
const Application = require("../models/Application");

// Recruiter creates a job / internship
exports.createJob = async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      recruiterId: req.user.id
    });
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Recruiter views applicants for their jobs
exports.viewApplicants = async (req, res) => {
  try {
    const jobs = await Job.find({ recruiter: req.user.id }).select('_id');
    const jobIds = jobs.map(job => job._id);

    const applications = await Application.find({ jobId: { $in: jobIds } })
      .populate("studentId", "name email")
      .populate("jobId", "title");

    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
