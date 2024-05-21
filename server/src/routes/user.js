const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { verifyToken } = require("../middleware/auth");

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

router.get("/", verifyToken, async (req, res) => {
  try {
    // only users whose role is not admin
    const users = await User.find({ role: "user" });
    res.send({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error fetching users",
      error: error.message,
    });
  }
});

router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("name address");

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

router.put("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: req.body.name,
        address: req.body.address,
      },
      { new: true }
    );
    res.send({
      success: true,
      message: "User details updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error updating user details",
      error: error.message,
    });
  }
});
  

module.exports = router;
