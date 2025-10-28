const mongoose = require("mongoose");

const receiptSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: [
        {
            productName: String,
            price: Number,
            qty: Number
        }
    ],
    total: Number,
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports =  mongoose.model("Receipt", receiptSchema);
