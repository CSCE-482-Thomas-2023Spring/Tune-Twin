import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { Login } from '../components/index.js';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: props.userId
        };
    }

    render() {
        if(this.state.userId !== "-1") {
            return <Navigate to='/profile' />
        }
        else {
            return (
                <Login />
            );
        }
    }
}
  
export default LoginPage;