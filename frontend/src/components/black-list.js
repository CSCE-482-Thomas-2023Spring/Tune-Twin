import React, { Component } from 'react';
import "../style/profile.css";

class BlackList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genres: [],
            songs: [],
            artists: []
        };
    }

    fetchDetails = () => {
        console.log("Fetched")
    }

    render() {
        return (
            <div>
                <h3>Black List</h3>
            </div>
        );
    }
}
  
export default BlackList;