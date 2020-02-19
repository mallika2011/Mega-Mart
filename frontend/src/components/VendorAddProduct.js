import React, { Component } from "react";
import axios from "axios";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Navbar from 'react-bootstrap/Navbar'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";


export default class VendorAddProducts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username:"",
      productname: "",
      price: "",
      quantity: "",
    };

    this.onChangeProductName = this.onChangeProductName.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeQuantity= this.onChangeQuantity.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
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

  onChangeProductName(event) {
    this.setState({ productname: event.target.value });
  }

  onChangePrice(event) {
    this.setState({ price: event.target.value });
  }

  onChangeQuantity(event) {
    this.setState({ quantity: event.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newProd = {
      username: this.state.username,
      productname: this.state.productname,
      price: this.state.price,
      quantity: this.state.quantity,
      status:"---",
      quantity_ordered:0,
      quantity_remaining:this.state.quantity
    };

    axios.post("http://localhost:4000/addvendorproduct", newProd).then(res => {
      if (res.data === 2) alert("Duplicate Product! Already exists");
      else if(res.data === 1) alert("Please enter required fields")
      else if(res.data === 3) alert("Incorrect field types!")
      else alert("Product succesfully added!")
      console.log(res.data);
    });

    this.setState({
      productname: "",
      price: "",
      quantity: "",
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
              <Nav.Link href="/dispatch">Dispatch Ready   </Nav.Link>
              <Nav.Link href="/dispatch">Dispatched   </Nav.Link>
            </Nav>
            <Nav>
                <Nav.Link href="/">Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <br/>
        <br/>
        <h1>Add New Product</h1>
        
        <Form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Product Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.productname}
              onChange={this.onChangeProductName}
            />
          </div>
          <div className="form-group">
            <label>Price: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.price}
              onChange={this.onChangePrice}
            />
          </div>
          <div className="form-group">
            <label>Quantity: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.quantity}
              onChange={this.onChangeQuantity}
            />
          </div>
          
          {/* <Form.Group
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
          </Form.Group> */}
          <div className="form-group">

            <input type="submit" value="Add Product" className="btn btn-primary" />
          </div>
        </Form>
      </div>
    );
  }
}
