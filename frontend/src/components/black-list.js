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

    componentDidMount = () => {
        console.log("Black list mounted");
        this.fetchBlackList();
    }

    fetchBlackList = () => {
        console.log("Black List Fetched");
        this.setState({
            genres: ["Country", "Indie", "Rock"],
            songs: ["Closer - The Chainsmokers"],
            artists: ["Queen"]
        });
    }

    render() {
        return (
            <div>
                <h3>Black List</h3>
                {
                    this.state.genres.length === 0 && 
                    this.state.songs.length === 0 &&
                    this.state.artists.length === 0 &&
                    <div>There is nothing on your black list!</div>
                }
                {
                    this.state.genres.length > 0 &&
                    this.state.genres.map((elem, i) => <div key={i}>Genre: {elem}</div>)
                }
                {
                    this.state.songs.length > 0 &&
                    this.state.songs.map((elem, i) => <div key={i}>Song: {elem}</div>)
                }
                {
                    this.state.artists.length > 0 &&
                    this.state.artists.map((elem, i) => <div key={i}>Artist: {elem}</div>)
                }
            </div>
        );
    }
}
  
export default BlackList;