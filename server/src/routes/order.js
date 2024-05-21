const router = require("express").Router();
const Order = require("../models/Order");
const { verifyToken, isAdmin } = require("../middleware/auth");

router.post("/", verifyToken, async (req, res) => {
    try {
        const order = new Order({
            user: req.user._id,
            items: req.body.items,
            total: req.body.total,
            status: "confirming",
            payment: req.body.paymentMethod,
            screenshot: req.body.paymentMethod === "bank" ? req.body.paymentImage : undefined,
        });
        await order.save();
        res.send({
            success: true,
            message: "Order created successfully",
            data: order,
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Error creating order",
            error: error.message,
        });
    }
});

router.get("/", verifyToken, isAdmin, async (req, res) => {
    try {
        const orders = await Order.find().populate("user", "name email");
        res.send({
            success: true,
            data: orders,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error fetching orders",
            error: error.message,
        });
    }
});

exports = module.exports = router;