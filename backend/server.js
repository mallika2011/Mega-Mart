const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 4000;
const Routes = express.Router();

var bcrypt = require("bcrypt");
var BCRYPT_SALT_ROUNDS = 12;

let User = require("./models/user");
let Products = require("./models/products");
let Cart = require("./models/cart");
let Dispatched = require("./models/dispatched");


app.use(cors());
app.use(bodyParser.json());

// Connection to mongodb
mongoose.connect("mongodb://127.0.0.1:27017/users", { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", function() {
    console.log("MongoDB database connection established succesfully.");
});

/*
 *  API endpoints
 */


// Getting all the users
Routes.route("/").get(function(req, res) {
    User.find(function(err, users) {
        if (err)
            console.log(err);
        else {
            console.log(users);
            res.json(users);
        }
    });
});

Routes.route("/showdispatchedProducts").get(function(req, res) {    
    Dispatched.find(function(err, disp) {
        if (err)
            console.log(err);
        else {
            console.log(disp);
            res.json(disp);
        }
    });
});

//Show all available products to customer
Routes.route("/showavailableprods").get(function(req, res) {
    let s="price"
    console.log("default")
    var mysort = {s:1};
    Products.find().sort(s).exec(function(err, p) {
        if (err)
            console.log(err);
        else {
            console.log(p);
            res.json(p);
        }
    });
});


//Vendor utility API
Routes.route("/vendor").post(function(req, res) {
    User.findOne({ username: req.body.username }, function(err, users) {
        if (err)
            console.log(err);
        else {
            if (!users) {
                //Not found
                console.log("Not registered");
                res.send("1");
            } else {
                res.json(users);
            }
        }
    });
});

// Login API
Routes.route("/login").post(function(req, res) {
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
Routes.route("/add").post(function(req, res) {
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
Routes.route("/:id").get(function(req, res) {
    let id = req.params.id;
    User.findById(id, function(err, user) {
        res.json(user);
    });
});

//Add a vendor product
Routes.route("/addvendorproduct").post(function(req, res) {
    let products = new Products(req.body);
    console.log("enterd", req.body)
    if(!req.body.username || !req.body.productname || !req.body.quantity || !req.body.price)
    {
        res.send("1");
    }
    else if(isNaN(req.body.price) || isNaN(req.body.quantity))
    {
        res.send("3");
    }
    else{
        Products.find({ username: req.body.username}, function(err, p) {
            if (err)
                console.log(err);
            else {
                if(p.length==0)
                {
                    products.save()
                    .then(products => { res.status(200).json({ Products: "Product added successfully" }); })
                    .catch(err => { res.status(400).send("Error"); });
                }
                else{
                    console.log(p);
                    Products.find({ productname: req.body.productname }, function(err, p2) {
                        if (err)
                            console.log(err);
                        else {
                            if (p2.length!=0)
                                res.send("2");
                            else {
                                products.save()
                                    .then(products => { res.status(200).json({ Products: "Product added successfully" }); })
                                    .catch(err => { res.status(400).send("Error"); });
                            }
                        }
                    });
                }
            }
        });
    } 
});

//Delete a vendor product
Routes.route("/deleteVendorProduct").post(function(req, res) {
    let id = req.body.id;
    Products.findById(id, function(err, prod) {
        if(err)
            console.log(err);
        else{
            Products.deleteOne(prod, function(err, obj) {
                if (err) throw err;
                else 
                {
                    console.log("the product ot be cancelled is ", prod);
                    var myquery = { productid: prod._id };
                    var newvalues = { $set: {status:"Cancelled"} };
                    Cart.updateMany(myquery, newvalues, function(err, res) {
                        if (err) throw err;
                        console.log("1 document updated");
                    });
                    console.log("1 document deleted", prod);
                    res.json(prod);
                }
            });
        }
    });
});

//View all vendor's products
Routes.route("/viewVendorProduct").post(function(req, res) {
    console.log("In view ", req);
    
    Products.find({ username: req.body.username, quantity_remaining: { $gt: 0 } }, function(err, p) {
        if (err)
            console.log(err);
        else {
            if (!p.length) {
                //Not found
                console.log("No Products");
                res.json(p);
            } 
            else {
                res.json(p);
            }
        }
    });
});

//View all products ready for dispatch
Routes.route("/dispatchviewVendorProduct").post(function(req, res) {
    console.log("In dispatch ", req);
    Products.find({ username: req.body.username, quantity_remaining: { $lte: 0 } }, function(err, p) {
        if (err)
            console.log(err);
        else {
            if (!p.length) {
                //Not found
                console.log("No Products");
                res.json(p);
            } 
            else {
                res.json(p);
            }
        }
    });
});

//Dispatch products
Routes.route("/dispatchVendorProduct").post(function(req, res) {
    Products.find({ _id: req.body.id }, function(err, p) {
        if (err)
            console.log(err);
        else {
            console.log(p[0].productname);
            if (!p.length) {
                console.log("No Products");
                res.json(p);
            } 
            else {
                Products.deleteOne(p[0], function(err, obj) {
                    if (err) throw err;
                    else 
                    {
                        var myquery = { productid: p[0]._id };
                        var newvalues = { $set: {status:"Dispatched"} };
                        Cart.updateMany(myquery, newvalues, function(err, res) {
                            if (err) throw err;
                        });
                        let d = new Dispatched({
                            productid:p[0]._id,
                            seller:p[0].username,
                            productname:p[0].productname,
                            review:"",
                            rating:0
                        });
                        d.save() //Add a new dispatched good
                        res.json(p[0]);
                    }
                });               
            }
        }
    });
});

//View all my orders
Routes.route("/showmyproducts").post(function(req, res) {
    Cart.find({ username: req.body.username }, function(err, p) {
        if (err)
            console.log(err);
        else {
            if (!p.length) {
                //Not found
                console.log("No Products");
                res.json(p);
            } 
            else {
                res.json(p);
            }
        }
    });
});



Routes.route("/sortshowavailableprods").post(function(req, res) {
    let s=req.body.type
    if(!req.body.type)
    {   
        console.log("default")
        s="price"
    }
    else
        console.log(s)
        var mysort = {s:1};
        Products.find().sort(s).exec(function(err, p) {
            if (err)
                console.log(err);
            else {
                console.log(p);
                res.json(p);
            }
        });
});

//Add a customer product
Routes.route("/addCustomerProduct").post(function(req, res) {
    let cart = new Cart(req.body);
    console.log("New product");
    console.log(req.body)
    Products.findById(req.body.productid, function(err, prod) {
        if(err)
            console.log(err);
        else{
            console.log("the customer bought is ", prod);
            if(prod.quantity_remaining < req.body.quantity)
            {
                res.send("1");
            }
            else
            {                
                console.log("After success check quantity : ",)
                if(prod.quantity_remaining-req.body.quantity === 0 )
                {
                    console.log("Changing status to Placed", prod._id);
                    var myquery = { productid: prod._id };
                    var newvalues = { $set: {status:"Placed"} };
                    Cart.updateMany(myquery, newvalues, function(err, res) {
                        if (err) throw err;
                    }); 
                    cart.status="Placed" 
                    cart.save()
                }
                cart.save()
                .then(user => {
                    res.status(200).json({ Cart: "Order successfully" });
                })
                .catch(err => {
                    res.status(400).send("Error");
                });

                var myquery = { _id: req.body.productid };
                var newvalues = { $set: {quantity_remaining: prod.quantity_remaining-req.body.quantity,quantity_ordered: prod.quantity_ordered+req.body.quantity} };
                Products.updateOne(myquery, newvalues, function(err, resp) {
                    if (err) throw err;
                    console.log(" Updated remaining qty", resp);
                });
            }
        }
    });
});

Routes.route("/editCustomerProduct").post(function(req, res) {
    let cart = new Cart(req.body);
    console.log("New product");
    console.log(req.body)
    Products.findById(req.body.productid, function(err, prod) {
        if(err)
            console.log(err);
        else{
            console.log("the customer bought is ", prod);
            if(prod.quantity_remaining + req.body.quantity_ordered < req.body.newquantity)
            {
                res.send("1");
            }
            else
            {                
                console.log("After success check quantity : ",)
                if(prod.quantity_remaining+req.body.quantity_ordered-req.body.newquantity === 0 )
                {
                    console.log("Changing status to Placed", prod._id);
                    var myquery = { productid: prod._id };
                    var newvalues = { $set: {status:"Placed"} };
                    Cart.updateMany(myquery, newvalues, function(err, res) {
                        if (err) throw err;
                    }); 
                    // cart.status="Placed" 
                    // cart.save()
                }
                var myquery = { _id: req.body.productid };
                var newvalues = { $set: {quantity_remaining: prod.quantity_remaining+ req.body.quantity_ordered-req.body.newquantity,quantity_ordered: prod.quantity_ordered-req.body.quantity_ordered+req.body.newquantity} };
                Products.updateOne(myquery, newvalues, function(err, resp) {
                    if (err) throw err;
                    console.log(" Updated remaining qty", resp);
                });
                var myquery = { _id: req.body._id };
                var newvalues = { $set: {quantity:req.body.newquantity} };
                Cart.updateMany(myquery, newvalues, function(err, res) {
                    if (err) throw err;
                }); 
            }
        }
    });
});


Routes.route("/ratereviewvendor").post(function(req, res) {
    console.log(req.body)
    var myquery = { username: req.body.seller};
    var newvalues = { $set: {rating: req.body.rating, review:req.body.review} };
    User.updateOne(myquery, newvalues, function(err, resp) {
        if (err) throw err;
        console.log(" Updated rating and review", resp);
        res.json(resp)
    });
});

Routes.route("/ratereviewproduct").post(function(req, res) {
    let prodrat = new Dispatched(req.body);
    prodrat.save()
        .then(user => {
            res.status(200).json({ Product: "Rating added successfully" });
        })
        .catch(err => {
            res.status(400).send("Error");
        });
});

Routes.route("/addrating").post(function(req, res) {
    console.log(req.body)
    var prod = req.body
    var final = [];
    var counter = 0;
    for(const element of prod) {
        User.findOne({ username: element.username}, function(error, result) {
            element["rating"]=result.rating
            final.push(element);
            if(counter == prod.length - 1) {
                res.json(final);
            }
            counter++;
        })
    }

});

Routes.route("/getvendorreview").post(function(req, res) {
    Dispatched.find({ seller: req.body.username }, function(err, p) {
        if (err)
            console.log(err);
        else {
            if (!p.length) {
                //Not found
                console.log("No Products");
                res.json(p);
            } 
            else {
                res.json(p);
            }
        }
    });

});



app.use("/", Routes);

app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});