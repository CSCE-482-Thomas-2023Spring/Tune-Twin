import React, { Component } from 'react';
import "../style/description.css";

class Description extends Component {
    render() {
        return (
            <div className="description-card">
                <h2>Welcome to Tune Twin!</h2>
                <div>
                    The goal of Tune Twin is to provide users with a powerful, 
                    new way to discover a diverse set of music recommendations 
                    based on songs they like. All it takes to get started is 
                    searching a song on Spotify that you like! Additionally, 
                    we have a set of filters you can utilize to customize your 
                    search.
                </div>
            </div>
        );
    }
}
  
export default Description;