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
        type: String
    },
    quantity: {
        type: String
    },
    status:{
        type: String
    }

});

module.exports = mongoose.model("Products", Products);