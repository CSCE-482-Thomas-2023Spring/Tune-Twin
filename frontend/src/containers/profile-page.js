import React, { Component } from 'react';
import { NavBar, ProfileDetails, FeatureList, BlackList } from '../components/index.js';

class ProfilePage extends Component {
    render() {
        return (
            <div>
                <div className="profile-body">
                    <h2>Profile</h2>
                    <ProfileDetails />
                    <FeatureList />
                    <BlackList />
                </div>
            </div>
        );
    }
}
  
export default ProfilePage;