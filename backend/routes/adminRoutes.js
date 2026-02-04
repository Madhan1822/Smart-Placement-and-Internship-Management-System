const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  getAllUsers,
  getAllJobs,
  getAllApplications,
  toggleUserStatus,
  getAdminStats,
  createLearningTopic,
  getLearningTopics,
  getLearningTopicById,
  updateLearningTopic,
  deleteLearningTopic
} = require("../controllers/adminController");

/* ===== DASHBOARD ===== */
router.get("/stats", auth, role("admin"), getAdminStats);

/* ===== USERS ===== */
router.get("/users", auth, role("admin"), getAllUsers);
router.put("/user/:id/toggle", auth, role("admin"), toggleUserStatus);

/* ===== JOBS & APPLICATIONS ===== */
router.get("/jobs", auth, role("admin"), getAllJobs);
router.get("/applications", auth, role("admin"), getAllApplications);

/* ===== LEARNING TOPICS ===== */
router.post("/learning", auth, role("admin"), createLearningTopic); // admin
router.get("/learning", auth, getLearningTopics); // students

/* ===== UPDATE LEARNING TOPICS ===== */
router.get("/learning/:id", auth, role("admin"), getLearningTopicById);
router.put("/learning/:id", auth, role("admin"), updateLearningTopic);
router.delete("/learning/:id",auth, role("admin"), deleteLearningTopic);


module.exports = router;
