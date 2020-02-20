import React, { Component } from "react";
import axios from "axios";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
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
        type:""
      };

      this.sort=this.sort.bind(this);

    }
    
  
    componentDidMount() {
      const newUser = {
        username: localStorage.getItem("username")
      };
      const t = {
        type:this.state.type
      };
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
  sort=(s)=>{
    this.setState({type:s})
    console.log(this.state.type)
    this.componentDidMount();
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
            <DropdownButton id="dropdown-basic-button" onClick={()=>{this.sort('')}} variant="outline-info" title="Sort" style={{paddingRight:15}}>
              <Dropdown.Item onClick={()=>{this.sort('price')}}>Price</Dropdown.Item>
              <Dropdown.Item onClick={()=>{this.sort('quantity')}}>Quantity</Dropdown.Item> 
              <Dropdown.Item onClick={()=>{this.sort('rating')}}>Rating</Dropdown.Item>
            </DropdownButton>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={this.onchange}/>
              <Button variant="outline-info">Search</Button>
            </Form>
            <Nav>
                <Nav.Link style={{paddingLeft:15}}href="/">Logout</Nav.Link>
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




