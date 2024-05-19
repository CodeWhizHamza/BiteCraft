const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  const user = await User.findOne({ phoneNumber: req.body.phoneNumber });
  if (user) {
    return res.status(400).send({
      success: false,
      message: "User already exists",
    });
  }

  try {
    const user = new User({
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      password: bcrypt.hashSync(req.body.password, 10),
      role: "user",
      address: req.body.address,
    });
    await user.save();

    const token = jwt.sign(
      { _id: user._id, role: user.role, name: user.name },
      process.env.JWT_SECRET
    );

    res.send({
      success: true,
      message: "User created successfully",
      accessToken: token,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error creating user",
      error: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ phoneNumber: req.body.phoneNumber });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User not found",
      });
    }
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({
        success: false,
        message: "Invalid password",
      });
    }
    const token = jwt.sign(
      { _id: user._id, role: user.role, name: user.name },
      process.env.JWT_SECRET
    );
    res.send({
      success: true,
      message: "User logged in successfully",
      accessToken: token,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Account does not exist",
      error: error.message,
    });
  }
});

router.get("/profile", async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.send({
      success: true,
      message: "User details",
      data: user,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error fetching user details",
      error: error.message,
    });
  }
});

module.exports = router;
