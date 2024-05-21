const router = require("express").Router();
const Order = require("../models/Order");
const User = require("../models/User");
const FoodItem = require("../models/FoodItem");
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

router.get("/", verifyToken, async (req, res) => {

    try {

        if (req.user.role === "admin") {
            const orders = await Order.find();
            // order by created date
            orders.sort((a, b) => b.createdAt - a.createdAt);
            // order by status
            orders.sort((a, b) => {
                const orderStatus = ["confirming", "processing", "enroute", "delivered", "cancelled"];
                return orderStatus.indexOf(a.status) - orderStatus.indexOf(b.status);
            });
            for (let i = 0; i < orders.length; i++) {

                const customer = await User.findById(orders[i].user);
                orders[i]._doc.username = customer.name;
                orders[i]._doc.phoneNumber = customer.phoneNumber;
                orders[i]._doc.address = customer.address;

                for (let j = 0; j < orders[i].items.length; j++) {
                    let item = orders[i].items[j];
                    let product = await FoodItem.findById(item.id);
                    orders[i].items[j]._doc.name = product.name;
                    orders[i].items[j]._doc.price = product.price;
                    orders[i].items[j]._doc.image = product.image;
                    orders[i].items[j]._doc.description = product.description;
                }
            }
            res.send({
                success: true,
                data: orders,
            });
            return;
        }


        const orders = await Order.find({ user: req.user._id });
        // order by created date
        orders.sort((a, b) => b.createdAt - a.createdAt);

        for (let i = 0; i < orders.length; i++) {

            for (let j = 0; j < orders[i].items.length; j++) {
                let item = orders[i].items[j];
                let product = await FoodItem.findById(item.id);
                orders[i].items[j]._doc.name = product.name;
                orders[i].items[j]._doc.price = product.price;
                orders[i].items[j]._doc.image = product.image;
                orders[i].items[j]._doc.description = product.description;
            }
        }
        res.send({
            success: true,
            data: orders,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error fetching orders",
            error: error.message,
        });
    }
}
);

router.put("/:id", verifyToken, isAdmin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).send({
                success: false,
                message: "Order not found",
            });
        }
        order.status = req.body.status;
        await order.save();
        res.send({
            success: true,
            message: "Order updated successfully",
            data: order,
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Error updating order",
            error: error.message,
        });
    }
});

exports = module.exports = router;