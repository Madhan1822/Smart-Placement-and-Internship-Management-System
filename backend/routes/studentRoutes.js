const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const { applyJob } = require("../controllers/studentController");

router.get("/dashboard", auth, role("student"), (req, res) => {
  res.json("Student dashboard data");
});

router.post("/apply/:jobId", auth, role("student"), applyJob);

module.exports = router;
