const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  getProfile,
  updateProfile,
  getMyJobs,
  getJobApplicants
} = require("../controllers/recruiterController");


router.get("/profile", auth, role("recruiter"), getProfile);
router.put("/profile", auth, role("recruiter"), updateProfile);
router.get("/my-jobs", auth, role("recruiter"), getMyJobs);
router.get("/job/:jobId/applicants",auth,role("recruiter"),getJobApplicants);

module.exports = router;
