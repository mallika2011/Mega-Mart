const mongoose = require("mongoose");

const Customer = new mongoose.Schema({
  username: {
    type: String,
    required:true
  },
  productid:{
      type:String,
  }
});

module.exports = mongoose.model("Customer", Customer);
