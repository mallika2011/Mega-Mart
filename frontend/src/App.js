import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import UsersList from './components/AllUsers'
import Register from './components/Register'
import Login from './components/Login'
import VendorHome from './components/VendorHome'
import CustomerHome from './components/CustomerHome'
import Home from './components/Home'
import VendorAddProduct from './components/VendorAddProduct'
import VendorViewProduct from './components/VendorViewProduct'
import CustomerView from './components/CustomerView'
import CustomerCart from './components/CustomerCart'








function App() {
  return (
    <Router>
      <div className="container">
        <br/>
        <Route path="/" exact component={Home}/>
        <Route path="/allusers" exact component={UsersList}/>
        <Route path="/register" component={Register}/>
        <Route path="/login" component={Login}/>
        <Route path="/VendorHome" component={VendorHome}/>
        <Route path="/CustomerHome" component={CustomerHome}/>
        <Route path="/VendorAddProduct" component={VendorAddProduct}/>
        <Route path="/VendorViewProduct" component={VendorViewProduct}/>
        <Route path="/CustomerView" component={CustomerView}/>
        <Route path="/CustomerCart" component={CustomerCart}/>

      </div>
    </Router>
  );
}

export default App;
