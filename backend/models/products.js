const mongoose = require("mongoose");

const Products = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    productname: {
        type: String
    },
    price: {
        type: Number
    },
    quantity: {
        type: Number
    },
    status:{
        type: String
    },
    quantity_ordered:{
        type: Number
    },
    quantity_remaining:{
        type: Number
    },
    isDispatched:{
        type:Boolean
    },
    review:{
        type: String
    },
    rating:{
        type: Number
    },
    

});

module.exports = mongoose.model("Products", Products);