import React, {Component} from 'react';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav'

export default class VendorHome extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            productid: '',
            data:{}
        };

        // this.onChangeProductid = this.onChangeProductid.bind(this);

        // this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const username = localStorage.getItem('username');
        this.setState({ username: username});
        axios.get('http://localhost:4000/user')
             .then(response => {
                 this.setState({data: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
    }
       

    // onChangePassword(event) {
    //     this.setState({ password: event.target.value });
    // }

   

    render() {
        return (
            <div>
                <h1>CUSTOMER</h1>
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
        )
    }
}