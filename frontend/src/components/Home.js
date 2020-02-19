import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import UsersList from "./AllUsers";
import Register from "./Register";
import Login from "./Login";
import VendorHome from "./VendorHome";
import CustomerHome from "./CustomerHome";

export default class Home extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    localStorage.clear();
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand">
            Home
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/allusers" className="nav-link">
                  Users
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/register" className="nav-link">
                  Register Now
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <br/>
        <br/>
        <h1>HOMEPAGE</h1>
      </div>
    );
  }
}
