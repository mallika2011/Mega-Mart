const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const User = new mongoose.Schema({
  fullname: {
    type: String,
    required:true
  },
  email: {
    type: String,
    required:true
  },
  username: {
    type: String,
    required:true
  },
  password: {
    type: String,
    required:true
  },
  type: {
    type: String,
    required:true
  }
});

// ENCRYPTING PASSWORDS
User.pre('save', function(next) {
  var user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  }
  else{
      console.log(err)
      next();
  }
});

User.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model("User", User);
