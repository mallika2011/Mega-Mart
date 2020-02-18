import React, { Component } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      fullname: "",
      password: "",
      type: "vendor"
    };

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeFullname = this.onChangeFullname.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeType = this.onChangeType.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeUsername(event) {
    this.setState({ username: event.target.value });
  }

  onChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  onChangeFullname(event) {
    this.setState({ fullname: event.target.value });
  }

  onChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  onChangeType(event) {
    this.setState({ type: event.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      fullname: this.state.fullname,
      type: this.state.type
    };
    console.log("New ", newUser);

    axios.post("http://localhost:4000/add", newUser).then(res => {
      if (res.data === 1) alert("This username has already been taken");
      console.log(res.data);
    });

    this.setState({
      username: "",
      email: "",
      password: "",
      fullname: "",
      type: "vendor"
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
        <br/>
        <br/>
        <Form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Full Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.fullname}
              onChange={this.onChangeFullname}
            />
          </div>
          <div className="form-group">
            <label>Email: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
          </div>
          <div className="form-group">
            <label>Username: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input
              type="password"
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </div>
          <Form.Group
            controlId="exampleForm.ControlSelect1"
            value={this.state.type}
            onChange={this.onChangeType}
            inputRef={el => (this.inputEl = el)}
          >
            <Form.Label>Type</Form.Label>
            <Form.Control as="select">
              <option value="vendor">vendor</option>
              <option value="customer">customer</option>
            </Form.Control>
          </Form.Group>
          <div className="form-group">
            <input type="submit" value="Register" className="btn btn-primary" />
          </div>
        </Form>
      </div>
    );
  }
}
