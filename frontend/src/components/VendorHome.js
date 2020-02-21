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

        <div style={{backgroundColor:"#e0f5b9", padding:100, textAlign:"center"}}>
        <h1>Welcome {this.state.data.fullname} !</h1>
        </div>
      </div>
    );
  }
}
