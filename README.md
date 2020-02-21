# Mega Mart
A web app built using MERN for bulk orders for vendors and customers.

# Setup and Running 

* Start the mongodb server

```bash
    sudo mongod
```

* Get the backend sever running

```bash
    cd backend
    nodemon sever.js
```

* Start the front end

```bash
    cd ../frontend
    npm start
```

* Start the mongodb database (optional- used to view the databse)

```bash
    mongo
```

Your App should be up and running on http://localhost:3000/

# Features (Summary)

* Supports two types of users - customers and vendors

## Vendors 
* Add Products
* Remove Products
* Dispatch Products
* View Ratings and Reviews of their products

## Customer
* View all avaialable products
* Search / Sort products
* Add products to cart
* View Status of orders
* Edit exisiting orders
* Rate and Review products as well as vendors