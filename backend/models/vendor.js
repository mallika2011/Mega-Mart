const mongoose = require("mongoose");

const Vendor = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    products: {
        type: String,
    },
    price: {
        type: String
    },
    quantity: {
        type: String
    }

});

module.exports = mongoose.model("Vendor", Vendor);