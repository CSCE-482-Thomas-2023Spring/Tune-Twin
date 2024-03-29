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
        if(this.props.type === "song") {
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
        //Testing
        const testId = "ble-test-" + this.state.content[0];
        const bTestId = "bleb-test-" + this.state.content[0];

        if(!this.state.removed) {
            return (
                <div>
                    <div className="black-list-element" data-testid={testId}>
                        <img className="ble-image" src={this.state.content[2]} />
                        <div>{this.state.content[1]}</div>
                        <button className="ble-button" onClick={this.removeFromBlacklist} data-testid={bTestId}>Remove</button>
                    </div>
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
                <div data-testid="blacklist-elements">
                    {
                        this.state.songs.length === 0 &&
                        this.state.artists.length === 0 &&
                        <div>There is nothing on your black list!</div>
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
            </div>
        );
    }
}
  
export default BlackList;