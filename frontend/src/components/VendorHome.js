import React, { Component } from "react";
import axios from "axios";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Navbar from 'react-bootstrap/Navbar'

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
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/VendorHome">HOME</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/VendorAddProduct">Add Products   </Nav.Link>
              <Nav.Link href="/VendorViewProduct">View Products   </Nav.Link>
              <Nav.Link href="/VendorDispatch">Dispatch Ready   </Nav.Link>
              <Nav.Link href="/DispatchedProducts">Dispatched   </Nav.Link>
            </Nav>
            <Nav>
                <Nav.Link href="/">Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <br/>
        <br/>

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
      </div>
    );
  }
}
