import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeUsername(event) {
    this.setState({ username: event.target.value });
  }

  onChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      username: this.state.username,
      password: this.state.password
    };

    axios.post("http://localhost:4000/login", newUser).then(res => {
      console.log("respons", res.data);
      if (res.data.val === 0) {
        console.log("empty fields");
        alert("Please enter username and password");
      } else if (res.data.val === 1) {
        console.log("not registered");
        alert("You are not registered. Register Now!");
      } else if (res.data.val === 2) {
        console.log("incorrect password");
        alert("Incorrect Password! Try again.");
      }
      if (res.data.val === 3) {
        console.log("found");
        if(res.data.type === "vendor")
          this.props.history.push("/VendorHome");
        else 
          this.props.history.push("/CustomerHome");
          
      }
    });

    /*
     * Setup Local storage
     */

    localStorage.setItem("username", this.state.username);
    localStorage.setItem("type", this.state.type);

    this.setState({
      username: "",
      password: ""
    });
  }

  render() {
    return (
      
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand">Home</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/allusers" className="nav-link">Users</Link>
              </li>
              <li className="navbar-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
              <li className="navbar-item">
                <Link to="/register" className="nav-link">Register Now</Link>
              </li>
            </ul>
          </div>
        </nav>
        <br/>
        <br/>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>USERNAME: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="form-group">
            <label>PASSWORD: </label>
            <input
              id="password"
              type="password"
              name="password"
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="LOGIN" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}
