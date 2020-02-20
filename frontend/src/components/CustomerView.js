import React, { Component } from "react";
import axios from "axios";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Popup from 'react-popup';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


export default class CustomerView extends Component {
  constructor(props) {
      super(props);
      this.state = { 
        prods: [],
        search:"",
        quantity:0,
      };


    }
    
  
    componentDidMount() {
      const newUser = {
        username: localStorage.getItem("username")
      };
      const t = {
        type:""
      };
      // this.setState({ username: newUser.username });
      axios
        .post("http://localhost:4000/showavailableprods",t)
        .then(response => {
          this.setState({ prods: response.data });
        })
        .catch(function(error) {
          console.log(error);
        });
    }

  onchange = e =>{
    this.setState({search : e.target.value});
  }
  addtoccart(e){
    const quantity = prompt('Please enter the quantity')
    if(!isNaN(quantity) && quantity){
    this.setState({ quantity : quantity })
    console.log(this.state.quantity);
    const newProd = {
      username:localStorage.getItem("username"),
      productid: e._id,
      quantity:parseFloat(quantity),
      status:"Waiting",
      productname:e.productname,
      seller:e.username
    };
    axios
      .post("http://localhost:4000/addCustomerProduct", newProd)
      .then(response => {
        // this.setState({ prods: response.data });
        if(response.data == "1")
          alert("Sorry, insuficient quantity available");
        else
          alert("Order success!")
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
    }
    else{
      alert("Invalid Quantity")
    }
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
            {/* <NavDropdown title="Sort" id="collasible-nav-dropdown">
              <NavDropdown.Item value ="price" onClick={()=>{this.sort("price");}}>Price</NavDropdown.Item>
              <NavDropdown.Item value ="qty" onClick={()=>{this.sort("qty");}}>Quantity</NavDropdown.Item>
              <NavDropdown.Item value ="rat" onClick={()=>{this.sort("rat");}}>Rating</NavDropdown.Item>
            </NavDropdown> */}
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
                  <Button variant="success" className="btn btn-primary" value="buy" onClick={()=>{this.addtoccart(p);}}>Add</Button>
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




