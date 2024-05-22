const router = require("express").Router();
const Category = require("../models/Category");
const FoodItem = require("../models/FoodItem");
const { verifyToken, isAdmin } = require("../middleware/auth");

router.post("/", verifyToken, isAdmin, async (req, res) => {
  try {
    // check if category name already exists
    const categoryExists = await Category.findOne({ name: req.body.name });
    if (categoryExists) {
      return res.status(400).send({
        success: false,
        message: "Category name already exists",
      });
    }

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
    const categories = await Category.find();

    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }

    // check if category name already exists
    const categoryExists = categories.find(
      (c) => c.name === req.body.name && c._id != req.params.id
    );

    if (categoryExists) {
      return res.status(400).send({
        success: false,
        message: "Category name already exists",
      });
    }

    const foodItems = await FoodItem.find({ category: category.name });
    for (let item of foodItems) {
      item.category = req.body.name;
      await item.save();
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

    const foodItems = await FoodItem.find({ category: category.name });

    if (foodItems.length > 0) {
      return res.status(400).send({
        success: false,
        message: "Category has food items. Please delete them first",
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
