const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 4000;
const userRoutes = express.Router();

var bcrypt = require("bcrypt");
var BCRYPT_SALT_ROUNDS = 12;

let User = require("./models/user");
let Vendor = require("./models/vendor");

app.use(cors());
app.use(bodyParser.json());

// Connection to mongodb
mongoose.connect("mongodb://127.0.0.1:27017/users", { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", function() {
    console.log("MongoDB database connection established succesfully.");
});

var Users = [];

// API endpoints

// Getting all the users
userRoutes.route("/").get(function(req, res) {
    User.find(function(err, users) {
        if (err)
            console.log(err);
        else {
            console.log(users);
            res.json(users);
        }
    });
});

//Getting specific users
userRoutes.route("/vendor").post(function(req, res) {
    User.findOne({ username: req.body.username }, function(err, users) {
        if (err)
            console.log(err);
        else {
            if (!users) {
                //Not found
                console.log("Not registered");
                res.send("1");
            } else {
                console.log("in api ", users);
                res.json(users);
            }
        }
    });
});

// Searching for a users Lookup
userRoutes.route("/login").post(function(req, res) {
    console.log("Here");
    console.log(req.body);
    let response = {
        val: "",
        type: ""
    };
    if (!req.body.username || !req.body.password) {
        response.val = 0;
        res.json(response);
    } else {
        User.findOne({ username: req.body.username }, function(err, users) {
            if (err)
                console.log(err);
            else {
                if (!users) {
                    //Not found
                    console.log("Not registered");
                    response.val = 1;
                    res.json(response);
                } else {
                    users.comparePassword(req.body.password, function(err, isMatch) {
                        if (err) throw err;
                        console.log(req.body.password, isMatch); // -> Password123: true
                        if (isMatch) {
                            currentuser = req.body.username;
                            response.val = 3;
                            response.type = users.type;
                            res.json(response);
                        } else {
                            response.val = 2;
                            res.json(response);
                        }
                    });
                }
            }
        });
    }
    console.log("in server", response);
});

// Adding a new user
userRoutes.route("/add").post(function(req, res) {
    console.log(req);
    let user = new User(req.body);
    User.findOne({ username: req.body.username }, function(err, users) {
        if (err)
            console.log(err);
        else {
            if (!users) {
                //Not found
                console.log("New user");
                user.save()
                    .then(user => {
                        res.status(200).json({ User: "User added successfully" });
                    })
                    .catch(err => {
                        res.status(400).send("Error");
                    });
            } else
                res.status(200).send("1");
        }
    });
});

// Getting a user by id
userRoutes.route("/:id").get(function(req, res) {
    let id = req.params.id;
    User.findById(id, function(err, user) {
        res.json(user);
    });
});

userRoutes.route("/viewvendordetails").post(function(req, res) {
    Vendor.find({ username: req.body.username }, function(err, vendors) {
        if (err)
            console.log(err);
        else {
            console.log("Pringting debug", vendors);
            if (!vendors) {
                //Not found
                console.log("No Products");
                res.send("1");
            } else {
                console.log("in api ", vendors);
                res.json(vendors);
            }
        }
    });
});

userRoutes.route("/addvendorproduct").post(function(req, res) {
    let vendor = new Vendor(req.body);
    console.log("enterd", req.body)

    Vendor.find({ username: req.body.username}, function(err, vendors) {
        if (err)
            console.log(err);
        else {
            if(vendors.length==0)
            {
                vendor.save()
                .then(vendor => { res.status(200).json({ Vendor: "Product added successfully" }); })
                .catch(err => { res.status(400).send("Error"); });
            }
            else{
                Vendor.find({ productname: req.body.productname }, function(err, vendors2) {
                    if (err)
                        console.log(err);
                    else {
                        if (vendors2.length!=0)
                            res.send("2");
                        else {
                            vendor.save()
                                .then(vendor => { res.status(200).json({ Vendor: "Product added successfully" }); })
                                .catch(err => { res.status(400).send("Error"); });
                        }
                    }
                });
            }
        }
    });
    
});

app.use("/", userRoutes);

app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});