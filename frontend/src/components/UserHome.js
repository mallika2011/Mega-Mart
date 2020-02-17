import React, {Component} from 'react';
import axios from 'axios';

export default class UserHome extends Component {
    
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
            
        this.setState({
            username: '',
            password: '',
        });
    }

    render() {
        return (
            <div>
                <h1>lol </h1>
            </div>
        )
    }
}