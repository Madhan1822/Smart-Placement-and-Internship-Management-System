const express = require("express");
const router = express.Router();
const { createJob } = require("../controllers/jobController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

router.post("/job", auth, role("recruiter"), createJob);

module.exports = router;
