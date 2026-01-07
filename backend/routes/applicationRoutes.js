const express = require("express");
const router = express.Router();

const {
  applyJob,
  getMyApplications,
  updateApplicationStatus
} = require("../controllers/applicationController");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// Student applies for job
router.post("/apply/:jobId", auth, role("student"), applyJob);

// Student: get applied jobs (for disabling Apply button)
router.get("/my", auth, role("student"), getMyApplications);

// Student: applied jobs page
router.get("/applied", auth, role("student"), getMyApplications);

router.put(
  "/:applicationId/status",
  auth,
  role("recruiter"),
  updateApplicationStatus
);

module.exports = router;
