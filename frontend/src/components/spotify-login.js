import React, { Component } from 'react';
import "../style/spotify-login.css";

class SpotifyLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            loggedIn: this.props.accLinked,
            updating: false,
            error: false
        };
    }

    spotifyAccountLogin = async () => {
        const response = await fetch(`http://127.0.0.1:8000/loginToSpotify`);
        if(response.status === 200) {
            let parsed = await response.json();
            console.log(parsed);
            console.log(parsed.redirectUrl);
            if(parsed.redirectUrl) {
                window.location.href = parsed.redirectUrl;
            }
        } else {
            this.setState({ error: true })
            console.log("sptofiy login failed.");
        }
    }

    setToUpdating = () => {
        this.setState({ updating: true });
    }

    cancelUpdating = () => {
        this.setState({ updating: false });
    }

    render() {
        if(this.state.loggedIn) {
            return (
                <div className="spotify-connected">
                    <h3>Spotify Account: </h3>
                    <div className="connected">Connected</div>
                </div>
            );
        } else if(this.state.updating) {
            return (
                <div className="spotify-login-input-body">
                    <h3>Login to Spotify</h3>
                    <div className="spotify-acc-input">
                        <h4 className="spotify-acc-input-element">Spotify Username: </h4>
                        <input className="spotify-acc-input-element"></input>
                    </div>
                    <div className="spotify-acc-input">
                        <h4 className="spotify-acc-input-element">Spotify Password: </h4>
                        <input className="spotify-acc-input-element"></input>
                    </div>
                    {
                        this.state.error &&
                        <div className="spotify-login-error">Spotify account login failed.</div>
                    }
                    <div className="spotify-button-wrapper">
                        <button className="spotify-acc-login-button" onClick={this.spotifyAccountLogin}>Login</button>
                        <button className="spotify-login-cancel">Cancel</button>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="spotify-login-body">
                    <h3>Spotify Account</h3>
                    <button className="connect-button" onClick={this.spotifyAccountLogin}>Connect Account</button>
                </div>
            );
        }
    }
}
  
export default SpotifyLogin;