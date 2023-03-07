import React, { Component } from 'react';
import { NavBar, ProfileDetails, FeatureList, BlackList } from '../components/index.js';

class ProfilePage extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <ProfileDetails />
                <FeatureList />
                <BlackList />
            </div>
        );
    }
}
  
export default ProfilePage;