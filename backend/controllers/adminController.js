const User = require("../models/User");
const Job = require("../models/Job");
const Application = require("../models/Application");
const LearningTopic = require("../models/LearningTopic");
/* ================== DASHBOARD STATS ================== */
exports.getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalStudents = await User.countDocuments({ role: "student" });
    const totalRecruiters = await User.countDocuments({ role: "recruiter" });
    const totalJobs = await Job.countDocuments();
    const totalApplications = await Application.countDocuments();

    res.json({
      totalUsers,
      totalStudents,
      totalRecruiters,
      totalJobs,
      totalApplications
    });
  } catch (err) {
    res.status(500).json({ message: "Stats error" });
  }
};

/* ================== USERS ================== */
exports.getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

/* ================== JOBS ================== */
exports.getAllJobs = async (req, res) => {
  const jobs = await Job.find().populate("recruiter", "name email");
  res.json(jobs);
};

/* ================== APPLICATIONS (✅ FIXED) ================== */
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("studentId", "name email")
      .populate("jobId", "title company");

    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Application fetch error" });
  }
};

/* ================== TOGGLE USER ================== */
exports.toggleUserStatus = async (req, res) => {
  const user = await User.findById(req.params.id);
  user.isActive = !user.isActive;
  await user.save();
  res.json({ isActive: user.isActive });
};

/* ================== CREATE LEARNING TOPIC ================== */
exports.createLearningTopic = async (req, res) => {
  try {
    const { title, learningLinks, practiceLinks } = req.body;

    const topic = await LearningTopic.create({
      title,
      learningLinks,
      practiceLinks,
      createdBy: req.user.id
    });

    res.status(201).json(topic);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create topic" });
  }
};

/* ================== GET ALL LEARNING TOPICS ================== */
exports.getLearningTopics = async (req, res) => {
  try {
    const topics = await LearningTopic.find().sort({ createdAt: -1 });
    res.json(topics);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch topics" });
  }
};

/* ================== GET SINGLE LEARNING TOPIC ================== */
exports.getLearningTopicById = async (req, res) => {
  try {
    const topic = await LearningTopic.findById(req.params.id);
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }
    res.json(topic);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch topic" });
  }
};

/* ================== UPDATE LEARNING TOPIC ================== */
exports.updateLearningTopic = async (req, res) => {
  try {
    const { title, learningLinks, practiceLinks } = req.body;

    const updatedTopic = await LearningTopic.findByIdAndUpdate(
      req.params.id,
      { title, learningLinks, practiceLinks },
      { new: true }
    );

    res.json(updatedTopic);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update topic" });
  }
};

/* ================== DELETE LEARNING TOPIC ================== */
exports.deleteLearningTopic = async (req, res) => {
  try {
    const topic = await LearningTopic.findById(req.params.id);

    if (!topic) {
      return res.status(404).json({ message: "Learning topic not found" });
    }

    await topic.deleteOne();

    res.json({ message: "Learning topic deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete learning topic" });
  }
};

exports.getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalStudents = await User.countDocuments({ role: "student" });
    const totalRecruiters = await User.countDocuments({ role: "recruiter" });

    const activeUsers = await User.countDocuments({ isActive: true });
    const disabledUsers = await User.countDocuments({ isActive: false });

    const totalJobs = await Job.countDocuments();
    const totalApplications = await Application.countDocuments();

    res.json({
      users: {
        total: totalUsers,
        students: totalStudents,
        recruiters: totalRecruiters,
        active: activeUsers,
        disabled: disabledUsers
      },
      jobs: {
        total: totalJobs
      },
      applications: {
        total: totalApplications
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Stats error" });
  }
};