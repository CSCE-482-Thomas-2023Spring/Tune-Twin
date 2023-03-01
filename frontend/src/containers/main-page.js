import React, { Component } from 'react';
import NavBar from '../components/navbar.js';
import Description from '../components/description.js';

class MainPage extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <Description />
            </div>
        );
    }
}
  
export default MainPage;