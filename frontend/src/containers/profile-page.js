import React, { Component } from 'react';
import { ProfileDetails, FeatureList, BlackList } from '../components/index.js';
import { Navigate } from 'react-router-dom';

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expandFL: false,
            expandBL: false,
            profileData: {}
        };
    }

    fetchDetails = async () => {
        const response = await fetch(`http://localhost:8000/Profile/GetDetails?email=${this.props.userId}`);
        if(response.status === 200) {
            let parsed = await response.json();
            this.setState({profileData: parsed});
        } else {
            console.log("Account not found");
        }
    }

    componentDidMount = () => {
        this.fetchDetails();
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
            {
                Object.keys(this.state.profileData).length > 0 &&
                <div className="profile-body">
                    <h2>Profile</h2>
                    <ProfileDetails profileData={this.state.profileData} updateId={this.props.updateFunc}/>
                    <h3>Saved Filters</h3>
                    {
                        this.state.expandFL ?
                        <FeatureList toggle={this.toggleFeatureList} fList={this.state.profileData.feature_lists}/> :
                        <div className="button-wrapper">
                            <button className="expand-button" onClick={this.toggleFeatureList}>Expand Saved Filters</button>
                        </div>
                    }
                    <h3>Blacklist</h3>
                    {
                        this.state.expandBL ?
                        <BlackList toggle={this.toggleBlackList} profileData={this.state.profileData}/> :
                        <div className="button-wrapper">
                        <button className="expand-button" onClick={this.toggleBlackList}>Expand Blacklist</button>
                        </div>
                    }
                    <div className="button-wrapper">
                        <button className="logout-button" onClick={() => this.props.updateFunc("-1")}>Log out</button>
                    </div>
                </div>
            }
            </div>
        );
    }
}
  
export default ProfilePage;