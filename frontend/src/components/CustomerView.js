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
        review:[],
        search:"",
        quantity:0,
        type:"price",
        showreviews:false
      };

      this.sort=this.sort.bind(this);
      this.onChangeType = this.onChangeType.bind(this);

    }
      
  componentDidMount(x) {
    const newUser = {
      username: localStorage.getItem("username")
    };
    const t = {
      type:this.state.type
    };
    console.log("inmount",x);
    axios
      .post("http://localhost:4000/showavailableprods",t)
      .then(response => {
        axios
              .post("http://localhost:4000/addrating",response.data)
              .then(response2 => {
                this.setState({ prods: response2.data })
              })
              .catch(function(error) {
                console.log(error);
              });
              })
      .catch(function(error) {
        console.log(error);
      });
  }
  onChangeType(event) {
    console.log("inonchange",event.target.value)
    this.setState({ type: event.target.value });
    this.componentDidMount(event.target.value)
  }
  onchange = e =>{
    this.setState({search : e.target.value});
  }
  sort=(s)=>{
    this.componentDidMount();
  }

  getreview=(s)=>{
    alert("nice")
    const temp={
      username:s.username
    }
    axios
      .post("http://localhost:4000/getvendorreview", temp)
      .then(response => {
        this.setState({ review: response.data,showreviews:true})
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
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
            {/* <DropdownButton id="dropdown-basic-button" onClick={()=>{this.sort('')}} variant="outline-info" title="Sort" style={{paddingRight:15}}>
              <Dropdown.Item onClick={()=>{this.sort('price')}}>Price</Dropdown.Item>
              <Dropdown.Item onClick={()=>{this.sort('quantity')}}>Quantity</Dropdown.Item> 
              <Dropdown.Item onClick={()=>{this.sort('rating')}}>Rating</Dropdown.Item>
            </DropdownButton> */}
            <Form.Group style={{paddingTop:15, paddingRight:15}}  controlId="exampleForm.ControlSelect1" value={this.state.type} onChange={this.onChangeType} inputRef={el => (this.inputEl = el)}>
              <Form.Control as="select">
                <option value="price">Price</option>
                <option value="quantity">Quantity</option>
                <option value="rating">Rating</option>
              </Form.Control>
             </Form.Group>
            <Button style={{marginRight:15}}  onClick={()=>{this.sort();}} variant="outline-info">Sort</Button>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={this.onchange}/>
              <Button variant="outline-info">Search</Button>
            </Form>
            <Nav>
                <Nav.Link style={{paddingLeft:15}} href="/">Logout</Nav.Link>
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
              <th>Vendor</th>
              <th>Vendor Rating</th>
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
                  <td onClick={()=>{this.getreview(p);}}>{p.username}</td>
                  <td>{p.rating}</td>
                  <td>{p.quantity_remaining}</td>
                  <td className="del-cell">
                  <Button variant="success" className="btn btn-primary" value="buy" onClick={()=>{this.addtoccart(p);}}>Add</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
        <br/>
        <br/>
        <br/>
        <br/>

        
        { this.state.showreviews && <table className="table table-striped">
          <thead>
            <tr>
              <th>Vendor</th>
              <th>Vendor Reviews</th>
            </tr>
          </thead>
          <tbody>
            {this.state.review.map((ven, i) => {
              return (
                <tr>
                  <td>{ven.username}</td>
                  <td>{ven.review}</td>
                </tr>
              );
            })}
          </tbody>
        </table>}




      </div>
    );
  }
}




