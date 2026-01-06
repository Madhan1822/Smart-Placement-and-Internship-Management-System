const Job = require("../models/Job");

exports.getAllJobs = async (req, res) => {
  const jobs = await Job.find().sort({ createdAt: -1 });
  res.json(jobs);
};

exports.applyJob = async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) return res.status(404).json({ message: "Job not found" });

  if (job.applicants.includes(req.user.id)) {
    return res.status(400).json({ message: "Already applied" });
  }

  job.applicants.push(req.user.id);
  await job.save();

  res.json({ message: "Applied successfully" });
};

exports.createJob = async (req, res) => {
  try {
    const { title, company, location, description } = req.body;

    if (!title || !company || !location || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const job = await Job.create({
      title,
      company,
      location,
      description,
      recruiter: req.user.id
    });

    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
