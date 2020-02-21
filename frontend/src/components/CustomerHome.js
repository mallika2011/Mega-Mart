import React, { Component } from "react";
import axios from "axios";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Navbar from 'react-bootstrap/Navbar'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";


export default class VendorHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      productid: "",
      data: {}
    };
  }

  componentDidMount() {
    const newUser = {
      username: localStorage.getItem("username"),
      type:localStorage.getItem("type")
    };
    if(newUser.type!=="customer")
    {
      alert("You do not have permission to access this page")
      this.props.history.push("/");
    }
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

  render() {
    return (
      <div>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/CustomerHome">HOME</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/CustomerView">Add to Cart</Nav.Link>
                <Nav.Link href="/CustomerCart">Orders</Nav.Link>
            </Nav>
            <Nav>
                <Nav.Link href="/">Logout</Nav.Link>
            </Nav>
            {/* <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
            </Form> */}
        </Navbar>
        <br/>
        <br/>

        
        <div style={{backgroundColor:"#ff8080", padding:100, textAlign:"center"}}>
        <h1>Welcome {this.state.data.fullname} !</h1>
        </div>
      </div>
    );
  }
}
