import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../style/navbar.css";

class NavBar extends Component {
    render() {
        return (
            <nav className="Nav-Bar">
                <h1>
                    <Link className="Nav-Title" to="/">TuneTwin</Link>
                </h1>
                <ul className="Nav-Button-List">
                    <li>
                        <Link className="Nav-Button" to="/about">About</Link>
                    </li>
                    <li>
                        <Link className="Nav-Button" to="/login">Login</Link>
                    </li>
                    <li>
                        <Link className="Nav-Button" to="/signup">Sign-up</Link>
                    </li>
                </ul>
            </nav>
        );
    }
}
  
export default NavBar;