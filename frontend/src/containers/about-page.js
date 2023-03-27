import React, { Component } from 'react';
import { NavBar } from '../components/index.js';
import '../style/about-page.css';

class AboutPage extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <div className="section-1">
                        <div className="content">
                            <h2 style={{ color: 'white', textAlign: 'center', fontStyle: 'italic', lineHeight: '.4' }}>Welcome to TuneTwin!</h2>
                            <h1 style={{ color: 'white', textAlign: 'center', lineHeight: '.4' }}>About Us</h1>
                            <h2 style={{ color: 'white', textAlign: 'center', fontStyle: 'italic', lineHeight: '.4' }}>(And How to Use)</h2>
                        </div>
                    </div>
                    <div className="section-2">
                        <div className="content">
                            <div className="search-bar">
                                <h2 style={{ color: 'white', textAlign: 'center' }}>Simply enter a song...</h2>
                            </div>
                            <div className="recommendation">
                                <h2 style={{ color: 'black', textAlign: 'center' }}> </h2>
                                <h2 style={{ color: 'black', textAlign: 'center' }}>Enter your filters...</h2>
                                <h2 style={{ color: 'black', textAlign: 'center' }}>And we'll do the rest!</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AboutPage;