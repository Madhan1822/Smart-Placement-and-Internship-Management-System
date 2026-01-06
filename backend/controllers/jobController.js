const Job = require("../models/Job");

exports.getAllJobs = async (req, res) => {
  const jobs = await Job.find().sort({ createdAt: -1 });
  res.json(jobs);
};

exports.createJob = async (req, res) => {
  try {
    const { title, company, location, description, requirements } = req.body;

    if (!title || !company || !location || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const job = await Job.create({
      title,
      company,
      location,
      description,
      requirements,
      recruiter: req.user.id
    });

    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
