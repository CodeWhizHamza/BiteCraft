const router = require("express").Router();
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/login", async (req, res) => {
  try {
    const admin = await Admin.findOne({ username: req.body.username });
    if (!admin) {
      return res.status(400).send({
        success: false,
        message: "Admin not found",
      });
    }
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      admin.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({
        success: false,
        message: "Invalid credentials",
      });
    }
    const token = jwt.sign(
      { _id: admin._id, role: "admin", name: admin.username },
      process.env.JWT_SECRET
    );
    res.send({
      success: true,
      message: "Admin logged in successfully",
      accessToken: token,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error logging in",
      error: error.message,
    });
  }
});

module.exports = router;
