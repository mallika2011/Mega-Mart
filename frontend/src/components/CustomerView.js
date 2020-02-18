import React, { Component } from "react";
import axios from "axios";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


export default class CustomerView extends Component {
  constructor(props) {
      super(props);
      this.state = { 
        prods: [],
        search:""
      };
    }
  
    componentDidMount() {
      const newUser = {
        username: localStorage.getItem("username")
      };
      // this.setState({ username: newUser.username });
      axios
        .get("http://localhost:4000/showavailableprods")
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
                <Nav.Link href="#features">Orders</Nav.Link>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={this.onchange}/>
              <Button variant="outline-info">Search</Button>
            </Form>
        </Navbar>
        <br/>
        <br/>
        <h1>Products List : </h1>        
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Seller</th>
              <th>Quantity Remaining</th>
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
                  <td>{p.price}</td>
                  <td>{p.username}</td>
                  <td>{p.quantity_remaining}</td>
                  <td className="del-cell">
                  <Button variant="success" className="btn btn-primary" value="buy">Add</Button>
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




