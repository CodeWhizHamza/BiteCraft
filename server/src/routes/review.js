const router = require("express").Router();
const Review = require("../models/Review");
const User = require("../models/User");
const FoodItem = require("../models/FoodItem");
const { verifyToken, isAdmin } = require("../middleware/auth");
const exp = require("constants");
const { log } = require("console");

router.post("/", verifyToken, async (req, res) => {
    try {
        const review = new Review({
            user: req.user._id,
            comment: req.body.comment,
            stars: req.body.stars,
            productId: req.body.productId,
        });
        await review.save();

        const
            user = await User.findById(req.user._id);
        review._doc.username = user.name;

        res.send({
            success: true,
            message: "Review created successfully",
            data: review,
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: error.message,
            error: error.message,
        });
    }
});

router.get("/", verifyToken, async (req, res) => {
    try {
        if (req.user.role === "admin") {
            const reviews = await Review.find();
            const modifiedReviews = [];
            for (let review of reviews) {
                const user = await User.findById(review.user);
                review._doc.username = user.name;
                const item = await FoodItem.findById(review.productId);
                if (item !== null) {
                    review._doc.itemName = item.name;
                    review._doc.image = item.image;
                    review._doc.description = item.description;
                }
                else {
                    review._doc.itemName = "[deleted]";
                    review._doc.image = "[deleted]";
                    review._doc.description = "[deleted]";
                }
                modifiedReviews.push(review);

            }
            res.send({
                success: true,
                message: "Reviews fetched successfully",
                data: modifiedReviews,
            });
            return;
        }

        const reviews = await Review.find();
        const modifiedReviews = [];
        for (let review of reviews) {
            const user = await User.findById(review.user);
            const item = await FoodItem.findById(review.productId);
            review._doc.itemName = item.name;
            review._doc.username = user.name;
            modifiedReviews.push(review);
        }
        res.send({
            success: true,
            message: "Reviews fetched successfully",
            data: modifiedReviews,
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

router.get("/:id", async (req, res) => {
    try {
        const item = await FoodItem.findById(req.params.id);

        if (!item) {
            return res.status(404).send({
                success: false,
                message: "Item not found",
            });
        }

        const reviews = await Review.find({ productId: req.params.id });

        const modifiedReviews = [];
        for (let review of reviews) {
            const user = await User.findById(review.user);
            review._doc.username = user.name;
            const item = await FoodItem.findById(review.productId);

            review._doc.itemName = item.name;
            modifiedReviews.push(review);
        }

        res.send({
            success: true,
            message: "Review fetched successfully",
            data: modifiedReviews,
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: error.message,
            error: error.message,
        });
    }
});

exports = module.exports = router;