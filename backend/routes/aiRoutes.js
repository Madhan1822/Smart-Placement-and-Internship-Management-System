const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { checkEligibilityAI } = require("../controllers/aiEligibilityController");

router.post("/check-eligibility-ai", auth, checkEligibilityAI);

module.exports = router;
