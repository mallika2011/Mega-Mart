import React, { Component } from "react";
import axios from "axios";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


export default class VendorDispatch extends Component {
  constructor(props) {
      super(props);
      this.state = { prods: [] };
      this.dispatchprod=this.dispatchprod.bind(this);
    }
  
    componentDidMount() {
      const newUser = {
        username: localStorage.getItem("username")
      };
      // this.setState({ username: newUser.username });
      axios
        .post("http://localhost:4000/dispatchviewVendorProduct", newUser)
        .then(response => {
          this.setState({ prods: response.data });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  dispatchprod(prod_id) {
    const newProd = {
      id: prod_id
    };
    axios
      .post("http://localhost:4000/dispatchVendorProduct", newProd)
      .then(response => {
        console.log(response.data)
        this.componentDidMount()
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
              <th>Product Name</th>
              <th>Price</th>
              {/* <th>Quantity</th> */}
              <th>Quantity Ordered</th>
              {/* <th>Quantity Remaining</th> */}
              {/* <th>Status</th> */}
              <th>Dispatch</th>
            </tr>
          </thead>
          <tbody>
            {this.state.prods.map((p, i) => {
              return (
                <tr>
                  <td>{p.productname}</td>
                  <td>{p.price}</td>
                  {/* <td>{p.quantity}</td> */}
                  <td>{p.quantity_ordered}</td>
                  {/* <td>{p.quantity_remaining}</td> */}
                  {/* <td>{p.status}</td> */}
                  <td className="del-cell">
                  <Button variant="warning" className="btn btn-primary" value="X" onClick={()=>{this.dispatchprod(p._id);}}>Dispatch</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}




