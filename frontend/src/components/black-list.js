import React, { Component } from 'react';
import "../style/profile.css";

class BlackListElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: "",
            content: this.props.content
        };
    }

    render() {
        return (
            <div className="black-list-element">
                <div>Picture</div>
                <div>{this.state.content}</div>
                <button className="ble-button">Remove</button>
            </div>
        )
    }
}

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
        this.parseBlackList();
    }

    parseBlackList = () => {
        this.setState({
            genres: this.props.profileData.blacklist_genres,
            songs: this.props.profileData.blacklist_songs,
            artists: this.props.profileData.blacklist_artists
        });
    }

    render() {
        return (
            <div>
                {
                    this.state.genres.length === 0 && 
                    this.state.songs.length === 0 &&
                    this.state.artists.length === 0 &&
                    <div>There is nothing on your black list!</div>
                }
                {
                    this.state.genres.length > 0 &&
                    this.state.genres.map((elem, i) => <BlackListElement key={i} content={"Genre: " + elem}/>)
                }
                {
                    this.state.songs.length > 0 &&
                    this.state.songs.map((elem, i) => <BlackListElement key={i} content={"Song: " + elem}/>)
                }
                {
                    this.state.artists.length > 0 &&
                    this.state.artists.map((elem, i) => <BlackListElement key={i} content={"Artist: " + elem}/>)
                }
                <button onClick={this.props.toggle}>Collapse Black List</button>
            </div>
        );
    }
}
  
export default BlackList;