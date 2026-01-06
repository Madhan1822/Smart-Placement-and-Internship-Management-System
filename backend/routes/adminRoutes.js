const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  getAllUsers,
  getAllJobs,
  getAllApplications,   // ✅ ADD THIS
  deleteJob,
  deleteUser            // ✅ ADD THIS
} = require("../controllers/adminController");

router.get("/users", auth, role("admin"), getAllUsers);
router.get("/jobs", auth, role("admin"), getAllJobs);
router.get("/applications", auth, role("admin"), getAllApplications);
router.delete("/job/:id", auth, role("admin"), deleteJob);
router.delete("/user/:id", auth, role("admin"), deleteUser);

module.exports = router;
