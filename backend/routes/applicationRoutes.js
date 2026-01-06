const express = require("express");
const router = express.Router();

const { applyJob } = require("../controllers/applicationController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

router.post("/apply/:jobId", auth, role("student"), applyJob);

module.exports = router;
