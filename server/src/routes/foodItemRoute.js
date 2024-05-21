const router = require("express").Router();
const FoodItem = require("../models/FoodItem");
const { verifyToken, isAdmin } = require("../middleware/auth");

router.post("/", verifyToken, isAdmin, async (req, res) => {
    try {
        console.log(req.body);
        const foodItem = new FoodItem({
            image: req.body.image,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            availability: req.body.isAvailable,
        });
        await foodItem.save();
        res.send({
            success: true,
            message: "Food item created successfully",
            data: foodItem,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: error.message,
            error: error.message,
        });
    }
});

router.get("/", async (req, res) => {
    try {
        const foodItems = await FoodItem.find();
        foodItems.sort((a, b) => a.category.localeCompare(b.category));
        res.send({
            success: true,
            data: foodItems,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error fetching food items",
            error: error.message,
        });
    }
});

router.put("/:id", verifyToken, isAdmin, async (req, res) => {
    try {
        const foodItem = await FoodItem.findById(req.params.id);
        if (!foodItem) {
            return res.status(404).send({
                success: false,
                message: "Food item not found",
            });
        }

        foodItem.image = req.body.image;
        foodItem.name = req.body.name;
        foodItem.description = req.body.description;
        foodItem.price = req.body.price;
        foodItem.category = req.body.category;
        foodItem.availability = req.body.availability;
        await foodItem.save();

        res.send({
            success: true,
            data: foodItem,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error updating food item",
            error: error.message,
        });
    }
});

router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
    try {
        const foodItem = await FoodItem.findById(req.params.id);
        if (!foodItem) {
            return res.status(404).send({
                success: false,
                message: "Food item not found",
            });
        }

        await FoodItem.findByIdAndDelete(req.params.id);

        res.send({
            success: true,
            message: "Food item deleted successfully",
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error deleting food item",
            error: error.message,
        });
    }
});

module.exports = router;