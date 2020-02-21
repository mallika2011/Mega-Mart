import React, { Component } from "react";
import NumericInput from 'react-numeric-input';
import axios from "axios";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Popup from 'react-popup';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


export default class CustomerView extends Component {
  constructor(props) {
      super(props);
      this.state = { 
        prods: [],
        search:"",
        quantity:0,
        rating:0,
        review:""
      };
      this.onChangeRating = this.onChangeRating.bind(this);
      this.onChangeReview= this.onChangeReview.bind(this);

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
  onChangeRating(event) {
    this.setState({ rating: event.target.value });
  }
  onChangeReview(event) {
    this.setState({ review: event.target.value });
  }

  editorder(e){
    const newProd = {
      _id:e._id,
      username:localStorage.getItem("username"),
      productid: e.productid,
      quantity_ordered:e.quantity,
      newquantity:0,
      status:e.status,
      productname:e.productname,
      seller:e.username
    };
    const quantity = prompt('Please enter New the quantity')
    if(!isNaN(quantity) && quantity){
    this.setState({ quantity : quantity })
    console.log(this.state.quantity);
    newProd.newquantity=parseFloat(quantity)
    axios
      .post("http://localhost:4000/editCustomerProduct", newProd)
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

  ratereviewvendor(e){
    const newProd = {
      username:e.username,
      rating:this.state.rating,
      review:this.state.review,
      seller:e.seller,
    };
    console.log(newProd);

    axios
      .post("http://localhost:4000/ratereviewvendor", newProd)
      .then(response => {
        // this.setState({ prods: response.data });
        if(response.data == "1")
          alert("Order success!")
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });

    this.setState({
      rating:"",
      review:""
    })
  }
  ratereviewproduct(e){
    const newProd = {
      productname:e.productname,
      productid:e.productid,
      rating:this.state.rating,
      review:this.state.review,
      seller:e.seller,
    };
    console.log(newProd);

    axios
      .post("http://localhost:4000/ratereviewproduct", newProd)
      .then(response => {
        // this.setState({ prods: response.data });
        if(response.data == "1")
          alert("Order success!")
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });

    this.setState({
      rating:"",
      review:""
    })
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
              <th>Quantity Remaining</th>
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
                  <td>{p.remaining}</td>
                  <td>{p.status}</td>
                  { p.status === "Waiting" && <td className="del-cell">
                  <Button variant="info" className="btn btn-primary" value="edit" onClick={()=>{this.editorder(p);}}>Edit</Button>
                  </td>}
                  { p.status === "Placed" && <td className="del-cell">
                    <Button variant="warning" className="btn btn-primary" value="edit" onClick={()=>{this.ratereviewvendor(p);}}>Vendor</Button>
                    </td>}
                  {p.status === "Placed" && <input placeholder="rate" type="Number"  style={{width:60,marginRight:10, marginTop:15}} onChange={this.onChangeRating}/>}
                  {p.status === "Placed" && <input placeholder="Write a review ..." type="Text" onChange={this.onChangeReview} />}


                  { p.status === "Dispatched" && <td className="del-cell">
                    <Button variant="warning" className="btn btn-primary" value="edit" onClick={()=>{this.ratereviewproduct(p);}}>Product</Button>
                    </td>}
                  {p.status === "Dispatched" && <input placeholder="Rate" type="Number"  style={{width:60,marginRight:10, marginTop:15}} onChange={this.onChangeRating}/>}
                  {p.status === "Dispatched" && <input placeholder="Write a review ..." type="Text" onChange={this.onChangeReview} />}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}




