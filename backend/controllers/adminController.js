const User = require("../models/User");
const Job = require("../models/Job");

/* Get all users */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/* Get all jobs */
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("recruiter", "name email");
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ✅ Get all applications */
exports.getAllApplications = async (req, res) => {
  try {
    const jobs = await Job.find().populate("applicants", "name email");

    const applications = [];

    jobs.forEach(job => {
      job.applicants.forEach(student => {
        applications.push({
          studentId: student._id,
          studentName: student.name,
          studentEmail: student.email,
          jobTitle: job.title,
          company: job.company
        });
      });
    });

    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/* Delete job */
exports.deleteJob = async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.json({ message: "Job deleted" });
};

/* ✅ Delete user */
exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};
