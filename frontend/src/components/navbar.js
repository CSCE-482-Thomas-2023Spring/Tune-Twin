import React, { Component } from 'react';
import "./navbar.css";

class NavBar extends Component {
    render() {
        return (
            <nav className="Nav-Bar">
                <h1 className="Nav-Title">Tune Twin</h1>
                <ul className="Nav-Button-List">
                    <li>
                        <div className="Nav-Button">About</div>
                    </li>
                    <li>
                        <div className="Nav-Button">Login</div>
                    </li>
                    <li>
                        <div className="Nav-Button">Sign-up</div>
                    </li>
                </ul>
            </nav>
        );
    }
}
  
export default NavBar;