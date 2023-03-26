import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import "../style/profile.css";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            loggedIn: false
        };
    }

    fetchDetails = async () => {
        const response = await fetch(`http://localhost:8000/Profile/GetDetails?email=${this.state.email}`);
        if(response.status === 200) {
            let parsed = await response.json();
            console.log(parsed);
            this.setState({loggedIn: true});
            this.props.updateFunc(parsed.email);
            console.log(parsed.email);
        } else {
            console.log("Account not found");
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
                <button className="login-button" onClick={this.fetchDetails}>Login</button><br></br>
                <Link to="/signup">I don't have an account!</Link>
            </div>
        );
    }
}
  
export default Login;