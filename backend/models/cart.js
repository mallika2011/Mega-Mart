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
    productname:{
        type: String
    },
    seller:{
        type:String
    },
    remaining:{
        type:Number
    }
});

module.exports = mongoose.model("Cart", Cart);