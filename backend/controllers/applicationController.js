const Application = require("../models/Application");
const Job = require("../models/Job");

// Student applies for job
exports.applyJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    // check job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // check already applied
    const alreadyApplied = await Application.findOne({
      studentId: req.user.id,
      jobId
    });

    if (alreadyApplied) {
      return res.status(400).json({ message: "Already applied" });
    }

    // create application
    const application = await Application.create({
      studentId: req.user.id,
      jobId,
      eligibilityStatus: "PENDING",
      matchedSkills: [],
      score: 0
    });

    res.status(201).json({
      message: "Application submitted. Eligibility pending.",
      application
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
