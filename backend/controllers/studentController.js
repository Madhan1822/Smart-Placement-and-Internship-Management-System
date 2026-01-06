const Application = require("../models/Application");

// Student applies for job
exports.applyJob = async (req, res) => {
  try {
    const alreadyApplied = await Application.findOne({
      studentId: req.user.id,
      jobId: req.params.jobId
    });

    if (alreadyApplied) {
      return res.status(400).json({ message: "Already applied" });
    }

    const application = await Application.create({
      studentId: req.user.id,
      jobId: req.params.jobId
    });

    res.status(201).json(application);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
