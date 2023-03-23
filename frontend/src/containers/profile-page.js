import React, { Component } from 'react';
import { ProfileDetails, FeatureList, BlackList } from '../components/index.js';
import { Navigate } from 'react-router-dom';

class ProfilePage extends Component {
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
                    <FeatureList />
                    <BlackList />
                    <button onClick={() => this.props.updateFunc("-1")}>Log out</button>
                </div>
            </div>
        );
    }
}
  
export default ProfilePage;