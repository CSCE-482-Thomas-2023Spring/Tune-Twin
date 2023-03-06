import React, { Component } from 'react';
import "../style/navbar.css";

class NavBar extends Component {
    render() {
        return (
            <nav className="Nav-Bar">
                <h1>
                    <a className="Nav-Title" href="/">TuneTwin</a>
                </h1>
                <ul className="Nav-Button-List">
                    <li>
                        <a className="Nav-Button" href="/about">About</a>
                    </li>
                    <li>
                        <a className="Nav-Button" href="/login">Login</a>
                    </li>
                    <li>
                        <a className="Nav-Button" href="/signup">Sign-up</a>
                    </li>
                </ul>
            </nav>
        );
    }
}
  
export default NavBar;