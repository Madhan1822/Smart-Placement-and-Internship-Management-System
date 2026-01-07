const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  createJob,
  getApplicantsForJob,
  getMyJobs          // 👈 ADD THIS
} = require("../controllers/recruiterController");

// Create job
router.post(
  "/job",
  auth,
  role("recruiter"),
  createJob
);

// Get recruiter jobs
router.get(
  "/my-jobs",
  auth,
  role("recruiter"),
  getMyJobs
);

// View applicants
router.get(
  "/job/:jobId/applicants",
  auth,
  role("recruiter"),
  getApplicantsForJob
);

module.exports = router;
