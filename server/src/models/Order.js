const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [
        {
            id: {
                type: Schema.Types.ObjectId,
                ref: "FoodItem",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    total: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["confirming", "processing", "enroute", "delivered", "cancelled"],
        default: "confirming",
    },
    payment: {
        type: String,
        enum: ["cash", "bank"],
        required: true,
    },
    screenshot: {
        type: String,
        required: function () {
            return this.payment === "bank";
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = model("Order", orderSchema);