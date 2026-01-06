const router = require("express").Router();
const { register, login } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login); // login handled later

module.exports = router;
