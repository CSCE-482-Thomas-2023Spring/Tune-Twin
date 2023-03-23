import React, { Component } from 'react';
import { ProfileDetails, FeatureList, BlackList } from '../components/index.js';
import { Navigate } from 'react-router-dom';

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expandFL: false,
            expandBL: false
        };
    }

    toggleFeatureList = () => {
        this.setState({ expandFL: !this.state.expandFL })
    }

    toggleBlackList = () => {
        this.setState({ expandBL: !this.state.expandBL });
    }

    render() {
        return (
            <div>
            {
                this.props.userId === "-1" &&
                <Navigate to="/" />
            }
                <div className="profile-body">
                    <h2>Profile</h2>
                    <ProfileDetails />
                    <h3>Saved Filters</h3>
                    {
                        this.state.expandFL ?
                        <FeatureList toggle={this.toggleFeatureList} /> :
                        <button onClick={this.toggleFeatureList}>Expand Saved Filters</button>
                    }
                    <h3>Black List</h3>
                    {
                        this.state.expandBL ?
                        <BlackList toggle={this.toggleBlackList}/> :
                        <button onClick={this.toggleBlackList}>Expand Black List</button>
                    }
                    <div className="logout-button-wrapper">
                        <button className="logout-button" onClick={() => this.props.updateFunc("-1")}>Log out</button>
                    </div>
                </div>
            </div>
        );
    }
}
  
export default ProfilePage;