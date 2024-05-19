const router = require("express").Router();
const Category = require("../models/Category");
const { verifyToken, isAdmin } = require("../middleware/auth");

router.post("/", verifyToken, isAdmin, async (req, res) => {
  try {
    const category = new Category({
      name: req.body.name,
    });
    await category.save();
    res.send({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error creating category",
      error: error.message,
    });
  }
});

module.exports = router;
