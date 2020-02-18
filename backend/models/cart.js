const mongoose = require("mongoose");

const Cart = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    productid: {
        type: String
    },
    quantity: {
        type: Number
    },
    status:{
        type: String
    },
    quaproductname:{
        type: Number
    }
});

module.exports = mongoose.model("Products", Products);