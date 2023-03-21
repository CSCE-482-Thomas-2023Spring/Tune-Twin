import React, { Component } from 'react';
import "../style/profile.css";

class ProfileDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "Loading...",
            password: "Loading...",
            name: "Loading..."
        };
    }

    componentDidMount = () => {
        console.log("Mounted");
        this.fetchDetails();
    }

    fetchDetails = () => {
        console.log("Fetched")
        this.setState({
            email: "dunglerb@gmail.com",
            password: "password123",
            name: "Dungler Binston"
        });
    }

    render() {
        return (
            <div>
                <h3>Profile Details</h3>
                <div>
                    Name: {this.state.name}
                </div>
                <div>
                    Email: {this.state.email}
                </div>
                <div>
                    Password: {this.state.password}
                </div>
            </div>
        );
    }
}
  
export default ProfileDetails;