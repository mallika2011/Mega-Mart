import React, {Component} from 'react';
import axios from 'axios';

export default class Login extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeUsername(event) {
        this.setState({ username: event.target.value });
    }

    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            username: this.state.username,
            password: this.state.password,
        }

        axios.post('http://localhost:4000/lookup', newUser).then(res => {
            console.log(res.data)
            if(res.data===0)
            {
                console.log("empty fields");
                alert("Please enter username and password")
            }
            else if(res.data===1)
            {
                console.log("not registered");
                alert("You are not registered. Register Now!")
            }            
            else if(res.data===2)
            {
                console.log("incorrect password");
                alert("Incorrect Password! Try again.")
            }            
            if(res.data===3)
            {
                console.log("found");
                alert("redirecting")
            }
        });
            
        this.setState({
            username: '',
            password: '',
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    
                    <div className="form-group">
                        <label>USERNAME: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.username}
                               onChange={this.onChangeUsername}
                               />  
                    </div>
                    <div className="form-group">
                        <label>PASSWORD: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.password}
                               onChange={this.onChangePassword}
                               />  
                    </div>
                    <div className="form-group">
                        <input type="submit" value="LOGIN" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}