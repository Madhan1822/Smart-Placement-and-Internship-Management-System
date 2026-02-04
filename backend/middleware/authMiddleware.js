const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔥 CHECK USER IN DATABASE
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // 🔴 BLOCK DISABLED USERS
    if (!user.isActive) {
      return res.status(403).json({
        message: "You are blocked by admin"
      });
    }

    req.user = {
      id: user._id,
      role: user.role
    };

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
