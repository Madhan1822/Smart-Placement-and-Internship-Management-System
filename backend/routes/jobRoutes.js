const express = require("express");
const router = express.Router();
const { getAllJobs, applyJob } = require("../controllers/jobController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

router.get("/", auth, getAllJobs);
router.post("/apply/:id", auth, role("student"), applyJob);

module.exports = router;
