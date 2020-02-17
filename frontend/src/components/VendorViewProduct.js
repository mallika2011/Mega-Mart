import React, { Component } from "react";
import axios from "axios";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


export default class VendorViewAll extends Component {
  constructor(props) {
      super(props);
      this.state = { prods: [] };
    }
  
    componentDidMount() {
      const newUser = {
        username: localStorage.getItem("username")
      };
      // this.setState({ username: newUser.username });
      axios
        .post("http://localhost:4000/viewVendorProduct", newUser)
        .then(response => {
          this.setState({ prods: response.data });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  onDelEvent() {
  this.props.onDelEvent(this.props.product);
  }

  render() {
    return (
      <div>
        <Nav variant="pills" defaultActiveKey="/home">
          <Nav.Item>
            <Nav.Link href="/VendorHome">HOME</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/VendorAddProduct">Add Products</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/VendorViewProduct">View All</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/dispatch">Dispatch</Nav.Link>
          </Nav.Item>
        </Nav>
        
        <h1>{localStorage.getItem("username")}'s Products</h1>
        
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {this.state.prods.map((p, i) => {
              return (
                <tr>
                  <td>{p.productname}</td>
                  <td>{p.price}</td>
                  <td>{p.quantity}</td>
                  <td>{p.status}</td>
                  <td className="del-cell">
                  <input type="button" value="X" className="del-btn"/>
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




