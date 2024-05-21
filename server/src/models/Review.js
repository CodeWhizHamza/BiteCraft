const { Schema, model } = require("mongoose");

const reviewSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    comment: {
        type: String,
        required: false,
    },
    stars: {
        type: Number,
        required: true,
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "FoodItem",
        required: true,
    },
});

module.exports = model("Review", reviewSchema);
