const Application = require("../models/Application");
const Job = require("../models/Job");

// Student applies for job
exports.applyJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const alreadyApplied = await Application.findOne({
      studentId: req.user.id,
      jobId
    });

    if (alreadyApplied) {
      return res.status(400).json({ message: "Already applied" });
    }

    // 🔹 Eligibility score logic
    let score = 0;

    if (job.requirements?.skills?.length) score += 40;
    if (job.requirements?.minCGPA <= 7) score += 30;
    if (job.requirements?.keywords?.length) score += 30;

    const application = await Application.create({
      studentId: req.user.id,
      jobId,
      score
    });

    res.status(201).json({
      message: "Applied successfully",
      score
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get applications of logged-in student
exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      studentId: req.user.id
    }).populate("jobId");

    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getAppliedJobs = async (req, res) => {
  try {
    const applications = await Application.find({
      studentId: req.user.id
    }).populate("jobId");

    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    if (!["ACCEPTED", "REJECTED"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const application = await Application.findByIdAndUpdate(
      applicationId,
      { status },
      { new: true }
    );

    res.json(application);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
