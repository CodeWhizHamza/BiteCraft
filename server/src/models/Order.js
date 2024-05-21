const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [
        {
        foodItem: {
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
        enum: ["confirming", "processing", "enroute", "delivered"],
        default: "pending",
    },
    payment: {
        type: String,
        enum: ["cash", "card"],
        required: true,
    },
    screenshot: {
        type: String,
        required: function () {
        return this.payment === "card";
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    });

module.exports = model("Order", orderSchema);