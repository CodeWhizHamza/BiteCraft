const router = require("express").Router();
const FoodItem = require("../models/FoodItem");
const { verifyToken, isAdmin } = require("../middleware/auth");

// const foodItemSchema = new Schema({
//     image: {
//         type: String,
//         required: true,
//     },
//     name: {
//         type: String,
//         required: true,
//     },
//     description: {
//         type: String,
//         required: true,
//     },
//     price: {
//         type: Number,
//         required: true,
//     },
//     category: {
//         type: String,
//         required: true,
//     },
// });

router.post("/", verifyToken, isAdmin, async (req, res) => {
    try {
        const foodItem = new FoodItem({
            image: req.body.image,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
        });
        await foodItem.save();
        res.send({
            success: true,
            message: "Food item created successfully",
            data: foodItem,
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Error creating food item",
            error: error.message,
        });
    }
});


