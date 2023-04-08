import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import "../style/profile.css";

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            loggedIn: false,
            error: false
        };
    }

    accountSignup = async () => {
        const request = {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                "first name": this.state.firstName,
                "last name": this.state.lastName
            })
        }
        const response = await fetch(`http://localhost:8000/Account/CreateAccount`, request);
        if(response.status === 200) {
            let parsed = await response.json();
            console.log(parsed);
            this.setState({loggedIn: true});
            this.props.updateFunc(this.state.email);
        } else {
            console.log("Account signup failed");
            this.setState({ error: true });
        }
    }

    render() {
        return (
            <div className="login-body">
                {
                    this.state.loggedIn &&
                    <Navigate to="/" />
                }
                <h2>Account Signup</h2>
                <div className="login-card">
                    <h3>Email: </h3>
                    <input value={this.state.email} onChange={(evt) => this.setState({email: evt.target.value})}></input>
                </div>
                <div className="login-card">
                    <h3>Password: </h3>
                    <input value={this.state.password} onChange={(evt) => this.setState({password: evt.target.value})}></input>
                </div>
                <div className="login-card">
                    <h3>First Name: </h3>
                    <input value={this.state.firstName} onChange={(evt) => this.setState({firstName: evt.target.value})}></input>
                </div>
                <div className="login-card">
                    <h3>Last Name: </h3>
                    <input value={this.state.lastName} onChange={(evt) => this.setState({lastName: evt.target.value})}></input>
                </div>
                {
                    this.state.error &&
                    <div className="login-error">Account signup failed. One or more of the account fields are invalid!</div>
                }
                <button className="login-button" onClick={this.accountSignup}>Sign up</button><br></br>
                <Link to="/login">I already have a TuneTwin account!</Link>
            </div>
        );
    }
}
  
export default Signup;