const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const upload = require("../middleware/upload");

const {
  applyJob,
  getProfile,
  updateProfile,
  checkEligibility
} = require("../controllers/studentController");

router.get("/dashboard", auth, role("student"), (req, res) => {
  res.json("Student dashboard data");
});

router.post("/apply/:jobId", auth, role("student"), applyJob);

router.get("/profile", auth, role("student"), getProfile);

router.put(
  "/profile",
  auth,
  role("student"),
  upload.single("resume"), // 🔥 buffer-based
  updateProfile
);

router.get(
  "/check-eligibility/:jobId",
  auth,
  role("student"),
  checkEligibility
);

module.exports = router;
