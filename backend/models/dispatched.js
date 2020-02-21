const mongoose = require("mongoose");

const Dispatched = new mongoose.Schema({
    productid:{
        type:String
    },
    seller: {
        type: String,
        required: true
    },
    productname: {
        type: String
    },
    review:{
        type: String
    },
    rating:{
        type: Number
    },   
});

module.exports = mongoose.model("Dispatched", Dispatched);