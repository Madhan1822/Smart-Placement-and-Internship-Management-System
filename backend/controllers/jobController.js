const Job = require("../models/Job");

// ---------------- GET ALL JOBS ----------------
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------- CREATE JOB ----------------
exports.createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      description,
      jobType,          // 🔥 NEW
      requirements
    } = req.body;

    if (!title || !company || !location || !description || !jobType) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const job = await Job.create({
      title,
      company,
      location,
      description,

      // 🔥 STORE JOB TYPE
      jobType, // "full-time" | "internship"

      requirements: {
        skills: requirements?.skills || [],
        minCGPA: requirements?.minCGPA || 0,
        keywords: requirements?.keywords || [],
        experience: requirements?.experience || ""
      },

      recruiter: req.user.id
    });

    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
