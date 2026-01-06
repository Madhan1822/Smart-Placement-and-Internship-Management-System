const express = require("express");
const router = express.Router();

const { getAllJobs, createJob } = require("../controllers/jobController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// Get all jobs (any logged-in user)
router.get("/", auth, getAllJobs);

// Recruiter creates job
router.post("/", auth, role("recruiter"), createJob);

module.exports = router;
