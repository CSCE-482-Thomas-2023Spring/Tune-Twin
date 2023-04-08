import React, { Component } from 'react';
import "../style/profile.css";

class BlackListElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: this.props.content[2],
            content: this.props.content,
            removed: false
        };
    }

    removeFromBlacklist = async () => {
        const request = {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            }
        }
        if(this.props.type === "genre") {
            request.body = JSON.stringify({
                email: this.props.email,
                blacklist_genres_to_remove: [this.props.content]
            });
        } else if(this.props.type === "song") {
            request.body = JSON.stringify({
                email: this.props.email,
                blacklist_songs_to_remove: [this.props.content[0]]
            });
        } else {
            request.body = JSON.stringify({
                email: this.props.email,
                blacklist_artists_to_remove: [this.props.content[0]]
            });
        }
        const response = await fetch(`http://localhost:8000/Profile/UpdateDetails`, request);
        if(response.status === 200) {
            this.setState({ removed: true });
            this.props.removal();
        } else {
            console.log("blacklist removal FAILED, ERROR " + response.status);
        }
    }

    render() {
        if(!this.state.removed) {
            return (
                <div>
                {
                    this.props.type === "genre" ?
                    <div className="black-list-element">
                        <div>Genre: {this.state.content}</div>
                        <button className="ble-button" onClick={this.removeFromBlacklist}>Remove</button>
                    </div> :
                    <div className="black-list-element">
                        <img className="ble-image" src={this.state.image} />
                        <div>{this.state.content[1]}</div>
                        <button className="ble-button" onClick={this.removeFromBlacklist}>Remove</button>
                    </div>
                }
                </div>
            )
        }
        return (
              <div></div>  
        )
    }
}

class BlackList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genres: [],
            songs: [],
            artists: [],
            bleElementRemoved: false
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

    elementRemoved = () => {
        this.setState({ bleElementRemoved: true });
    }

    render() {
        return (
            <div>
                <div className="button-wrapper">
                <button className="expand-button" onClick={this.props.toggle}>Collapse Blacklist</button>
                </div>
                {
                    this.state.genres.length === 0 && 
                    this.state.songs.length === 0 &&
                    this.state.artists.length === 0 &&
                    <div>There is nothing on your black list!</div>
                }
                {
                    this.state.genres.length > 0 &&
                    this.state.genres.map((elem, i) => <BlackListElement key={i} type="genre" content={elem} email={this.props.profileData.email} removal={this.elementRemoved}/>)
                }
                {
                    this.state.songs.length > 0 &&
                    this.state.songs.map((elem, i) => <BlackListElement key={i} type="song" content={elem} email={this.props.profileData.email} removal={this.elementRemoved}/>)
                }
                {
                    this.state.artists.length > 0 &&
                    this.state.artists.map((elem, i) => <BlackListElement key={i} type="artist" content={elem} email={this.props.profileData.email} removal={this.elementRemoved}/>)
                }
                {
                    this.state.bleElementRemoved &&
                    <div className="info-updated">Your blacklist has been updated.</div>
                }
            </div>
        );
    }
}
  
export default BlackList;