import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/")
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
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
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Username</th>
              <th>Password</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((currentUser, i) => {
              return (
                <tr>
                  <td>{currentUser.fullname}</td>
                  <td>{currentUser.email}</td>
                  <td>{currentUser.username}</td>
                  <td>{currentUser.password}</td>
                  <td>{currentUser.type}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
