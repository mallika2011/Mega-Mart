import React, { Component } from "react";
import axios from "axios";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


export default class DispatchedProducts extends Component {
  constructor(props) {
      super(props);
      this.state = { prods: [] };
    }
  
    componentDidMount() {
      const newUser = {
        username: localStorage.getItem("username")
      };
      if(localStorage.getItem("type")!=="vendor")
      {
        alert("You do not have permission to access this page")
        this.props.history.push("/");
      }
      // this.setState({ username: newUser.username });
      axios
        .get("http://localhost:4000/showdispatchedProducts")
        .then(response => {
          this.setState({ prods: response.data });
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
        
        <h1>{localStorage.getItem("username")}'s Products</h1>
        
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Seller</th>
              <th>Product Name</th>
              <th>Review</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {this.state.prods.map((p, i) => {
              return (
                <tr>
                  <td>{p.seller}</td>
                  <td>{p.productname}</td>
                  <td>{p.review}</td>
                  <td>{p.rating}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}




