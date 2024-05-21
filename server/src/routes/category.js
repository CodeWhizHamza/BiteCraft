const router = require("express").Router();
const Category = require("../models/Category");
const FoodItem = require("../models/FoodItem");
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

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    categories.sort((a, b) => a.name.localeCompare(b.name));

    // get itemCount in categories
    for (let i = 0; i < categories.length; i++) {
      const items = await FoodItem.find({ category: categories[i].name });
      categories[i]._doc.foodItemsCount = items.length;
    }

    res.send({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error fetching categories",
      error: error.message,
    });
  }
});

router.put("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }

    category.name = req.body.name;
    await category.save();

    res.send({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error fetching category",
      error: error.message,
    });
  }
});

router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }
    await Category.findByIdAndDelete(req.params.id);
    res.send({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error deleting category",
      error: error.message,
    });
  }
});

module.exports = router;
