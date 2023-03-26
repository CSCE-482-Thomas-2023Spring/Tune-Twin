import React, { Component } from 'react';
import "../style/profile.css";

class ProfileInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: props.email,
            password: props.password,
            name: props.name
        };
    }

    updateValue = (event) => {
        let value = event.target.value;
        if(this.props.name) {
            this.setState({name: value});
        } else if(this.props.email) {
            this.setState({email: value});
        } else {
            this.setState({password: value});
        }
    }

    editInfo = () => {
        if(this.props.name) {
            if(this.props.name === this.state.name) {
                console.log("No change detected");
            } else {
                this.props.updateFunc(this.state.name);
            }
        } else if(this.props.email) {
            if(this.props.email === this.state.email) {
                console.log("No change detected");
            } else {
                this.props.updateFunc(this.state.email);
            }
        } else {
            if(this.props.password === this.state.password) {
                console.log("No change detected");
            } else {
                this.props.updateFunc(this.state.password);
            }
        }
    }

    render() {
        let title = this.props.name ? "Name" : this.props.email ? "Email" : "Password";
        let value = this.props.name ? this.props.name : this.props.email ? this.props.email : this.props.password;

        return(
            <div className="profile-info">
                <h4>{title}: </h4>
                <input defaultValue={value} onChange={evt => this.updateValue(evt)}></input>
                <button onClick={this.editInfo}>Edit</button>
            </div>
        );
    }
};

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
        this.parseDetails();
    }

    parseDetails = () => {
            this.setState({
                name: this.props.profileData.name,
                email: this.props.profileData.email,
                password: this.props.profileData.password
            });
    }

    updateName = async (newName) => {
        const request = {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: this.props.profileData.email,
                name: newName
            })
        }
        const response = await fetch(`http://localhost:8000/UpdateDetails`, request);
        if(response.status === 200) {
            let parsed = await response.json();
            this.setState({ name: newName });
        } else {
            console.log("Account name update FAILED, ERROR " + response.status);
        }
    }

    updateEmail = async (newEmail) => {
        const request = {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: this.props.profileData.email,
                new_email: newEmail
            })
        }
        const response = await fetch(`http://localhost:8000/UpdateDetails`, request);
        if(response.status === 200) {
            let parsed = await response.json();
            this.setState({ email: newEmail });
        } else {
            console.log("Account email update FAILED, ERROR " + response.status);
        }
    }

    updatePassword = async (newPassword) => {
        const request = {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: this.props.profileData.email,
                password: newPassword
            })
        }
        const response = await fetch(`http://localhost:8000/UpdateDetails`, request);
        if(response.status === 200) {
            let parsed = await response.json();
            this.setState({ password: newPassword });
        } else {
            console.log("Account password update FAILED, ERROR " + response.status);
        }
    }

    render() {
        return (
            <div>
                <h3>Profile Details</h3>
                {
                    this.state.name === "Loading..." ? <div>Loading...</div> :
                    <ProfileInfo name={this.state.name} updateFunc={this.updateName}/>
                }
                {
                    this.state.email === "Loading..." ? <div>Loading...</div> :
                    <ProfileInfo email={this.state.email} updateFunc={this.updateEmail}/>
                }
                {
                    this.state.email === "Loading..." ? <div>Loading...</div> :
                    <ProfileInfo password={this.state.password} updateFunc={this.updatePassword}/>
                }
            </div>
        );
    }
}
  
export default ProfileDetails;