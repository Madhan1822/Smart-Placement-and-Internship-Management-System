module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user?.role?.toLowerCase();

    if (!allowedRoles.map(r => r.toLowerCase()).includes(userRole)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
};
