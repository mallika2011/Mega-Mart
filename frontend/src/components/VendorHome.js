import React, { Component } from "react";
import axios from "axios";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
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

  render() {
    return (
      <div>
        <Nav variant="pills" defaultActiveKey="/home">
          <Nav.Item>
            <Nav.Link href="/">HOME</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/viewprod">View Prod</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/addprod">Add Prod</Nav.Link>
          </Nav.Item>
        </Nav>
        <h1>Welcome {this.state.data.fullname} !</h1>

        {/* <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.users.map((currentUser, i) => {
                            return (
                                <tr>
                                    <td>{currentUser.fullname}</td>
                                    <td>{currentUser.email}</td>
                                    <td>{currentUser.username}</td>
                                    <td>{currentUser.password}</td>
                                    <td>{currentUser.type}</td>

                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table> */}
      </div>
    );
  }
}
