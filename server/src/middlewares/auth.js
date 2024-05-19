const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports.verifyToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token)
    return res.status(401).send({
      success: false,
      message: "Access Denied",
    });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send({
      success: false,
      message: "Invalid Token",
    });
  }
};

module.exports.isAdmin = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).send({
      success: false,
      message: "You are not authorized to access this resource",
    });
  }
  next();
};
