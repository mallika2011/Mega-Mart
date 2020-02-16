const mongoose = require('mongoose');

let User = new mongoose.Schema({
    fullname: {
        type: String
    },
    email: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    type: {
        type: String
    },
    products:{
        type: String
    }
});

module.exports = mongoose.model('User', User);