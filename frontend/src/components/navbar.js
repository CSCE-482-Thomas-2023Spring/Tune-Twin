import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../style/navbar.css";

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: props.userId
        };
    }

    logout = async () => {
        this.props.updateFunc("-1");
        const request = {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include'
        }
        const response = await fetch(`http://localhost:8000/Account/Logout`, request);
        if(response.status === 200) {
            this.props.updateFunc("-1");
            this.setState({ userId: "-1" });
        } else {
            console.log("Logout failed.");
        }
    }

    render() {
        if(this.props.userId === "-1") {
            return (
                <nav className="Nav-Bar">
                    <h1>
                        <Link className="Nav-Title" to="/">TuneTwin</Link>
                    </h1>
                    <ul className="Nav-Button-List">
                        <li>
                            <Link className="Nav-Button" to="/">Search</Link>
                        </li>
                        <li>
                            <Link className="Nav-Button" to="/about">Help</Link>
                        </li>
                        <li>
                            <Link className="Nav-Button" to="/login">Login</Link>
                        </li>
                        <li>
                            <Link className="Nav-Button" to="/signup">Signup</Link>
                        </li>
                    </ul>
                </nav>
            );
        } else {
            return (
                <nav className="Nav-Bar">
                    <h1>
                        <Link className="Nav-Title" to="/">TuneTwin</Link>
                    </h1>
                    <ul className="Nav-Button-List">
                        <li>
                            <Link className="Nav-Button" to="/">Search</Link>
                        </li>
                        <li>
                            <Link className="Nav-Button" to="/about">Help</Link>
                        </li>
                        <li>
                            <Link className="Nav-Button" to="/profile">Profile</Link>
                        </li>
                        <li>
                            <button className="Nav-Button" onClick={this.logout}>Logout</button>
                        </li>
                    </ul>
                </nav>
            );
        }
        
    }
}
  
export default NavBar;