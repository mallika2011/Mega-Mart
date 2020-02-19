import React, { Component } from "react";
import axios from "axios";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import Popup from 'react-popup';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


export default class CustomerView extends Component {
  constructor(props) {
      super(props);
      this.state = { 
        prods: [],
        search:"",
        quantity:0
      };

    }
    
    componentDidMount() {
      const x = {
        username: localStorage.getItem("username")
      };
      // this.setState({ username: newUser.username });
      axios
        .post("http://localhost:4000/showmyproducts",x)
        .then(response => {
          console.log(response.data);
          this.setState({ prods: response.data });
        })
        .catch(function(error) {
          console.log(error);
        });
    }

  onchange = e =>{
    this.setState({search : e.target.value});
  }

  render() {
    return (
      <div>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/CustomerHome">HOME</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/CustomerView">Add to Cart</Nav.Link>
                <Nav.Link href="/CustomerCart">Orders</Nav.Link>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={this.onchange}/>
              <Button variant="outline-info">Search</Button>
            </Form>
            <Nav>
                <Nav.Link href="/">Logout</Nav.Link>
            </Nav>
        </Navbar>
        <br/>
        <br/>
        <h1>Your Orders: </h1>        
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Seller</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Select</th>
              {/* <th>Quantity Ordered</th>
              <th>Status</th>
              <th>Delete</th> */}
            </tr>
          </thead>
          <tbody>
            {this.state.prods.map((p, i) => {
              const {search}=this.state;
              if(search !== "" && p.productname.toLowerCase().indexOf( search.toLowerCase() )=== -1 ){
                return null
              }
              return (
                <tr>
                  <td>{p.productname}</td>
                  <td>{p.seller}</td>
                  <td>{p.quantity}</td>
                  <td>{p.status}</td>
                  <td className="del-cell">
                  <Button variant="success" className="btn btn-primary" value="remove">bt</Button>
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




