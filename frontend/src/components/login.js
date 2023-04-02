import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import "../style/profile.css";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            loggedIn: false,
            error: false
        };
    }

    accountLogin = async () => {
        const request = {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        }
        const response = await fetch(`http://localhost:8000/Account/Login`, request);
        if(response.status === 200) {
            let parsed = await response.json();
            console.log(parsed);
            console.log(document.cookie);
            this.setState({loggedIn: true});
            this.props.updateFunc(this.state.email);
        } else {
            this.setState({ error: true })
        }
    }

    render() {
        return (
            <div className="login-body">
                {
                    this.state.loggedIn &&
                    <Navigate to="/" />
                }
                <h2>Account Login</h2>
                <div className="login-card">
                    <h3>Username: </h3>
                    <input value={this.state.email} onChange={(evt) => this.setState({email: evt.target.value})}></input>
                </div>
                <div className="login-card">
                    <h3>Password: </h3>
                    <input value={this.state.password} onChange={(evt) => this.setState({password: evt.target.value})}></input>
                </div>
                {
                    this.state.error &&
                    <div className="login-error">Login failed. An account could not be found with these login credentials.</div>
                }
                <button className="login-button" onClick={this.accountLogin}>Login</button><br></br>
                <Link to="/signup">I don't have an account!</Link>
            </div>
        );
    }
}
  
export default Login;