const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
const PORT = 4000;
const userRoutes = express.Router();

let User = require('./models/user');

app.use(cors());
app.use(bodyParser.json());

// Connection to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/users', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established succesfully.");
})

var Users = [];

// API endpoints

// Getting all the users
userRoutes.route('/').get(function(req, res) {
    User.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            console.log(users)
            res.json(users);
        }
    });
});

// Searching for a users Lookup
userRoutes.route('/lookup').post(function(req, res) {
    console.log("Here");
    console.log(req.body);
    if(!req.body.username || !req.body.password){
        res.send("0");
     } else {
        User.find({username:req.body.username},function(err,users){
            if (err) {
                console.log(err);
            } 
            else {
                if(users.length==0) //Not found 
                {
                    console.log("Not registered");
                    res.send("1");
                }
                else{
                    // console.log("Not allwoing me to look for pwd");
                    User.find({password:req.body.password},function(err,users2){
                        if(err)
                        {
                            console.log(err);
                        }
                        else{
                            if(users2.length==0)//not found
                                res.send("2");
                            else
                                res.send("3"); //TODO: Redirect to appropriate page
                        }
                    });
                }
            }
        });
     }
});

// Adding a new user
userRoutes.route('/add').post(function(req, res) {
    console.log(req);   
    let user = new User(req.body);
    user.save()
        .then(user => {
            res.status(200).json({'User': 'User added successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});

// Getting a user by id
userRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    User.findById(id, function(err, user) {
        res.json(user);
    });
});

app.use('/', userRoutes);

app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});
