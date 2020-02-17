import React, { Component } from "react";
import axios from "axios";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


export default class VendorHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      productid: "",
      data: {}
    };
  }

  componentDidMount() {
    const newUser = {
      username: localStorage.getItem("username")
    };
    this.setState({ username: newUser.username });
    axios
      .post("http://localhost:4000/vendor", newUser)
      .then(response => {
        this.setState({ data: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <Nav variant="pills" defaultActiveKey="/home">
          <Nav.Item>
            <Nav.Link href="/">HOME</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/viewprod">View Prod</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/addprod">Add Prod</Nav.Link>
          </Nav.Item>
        </Nav>
        <h1>Welcome {this.state.data.fullname} !</h1>

        {/* <table className="table table-striped">
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
                    { 
                        this.state.users.map((currentUser, i) => {
                            return (
                                <tr>
                                    <td>{currentUser.fullname}</td>
                                    <td>{currentUser.email}</td>
                                    <td>{currentUser.username}</td>
                                    <td>{currentUser.password}</td>
                                    <td>{currentUser.type}</td>

                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table> */}
        <Form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Product Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.fullname}
              onChange={this.onChangeFullname}
            />
          </div>
          <div className="form-group">
            <label>Price: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
          </div>
          <div className="form-group">
            <label>Quantity: </label>
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
