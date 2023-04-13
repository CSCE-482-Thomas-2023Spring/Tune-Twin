import React, { Component } from 'react';
import "../style/profile.css";

class ProfileInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: props.email,
            password: props.password,
            firstName: props.firstName,
            lastName: props.lastName,
            updating: false
        };
    }

    updateValue = (event) => {
        let value = event.target.value;
        if(this.props.firstName) {
            this.setState({firstName: value});
        } else if(this.props.lastName) {
            this.setState({lastName: value})
        } else if(this.props.email) {
            this.setState({email: value});
        } else {
            this.setState({password: value});
        }
    }

    editInfo = () => {
        if(this.props.firstName) {
            if(this.props.firstName === this.state.firstName) {
                console.log("No change detected");
            } else {
                this.props.updateFunc(this.state.firstName);
            }
        } else if(this.props.lastName) {
            if(this.props.lastName === this.state.lastName) {
                console.log("No change detected");
            } else {
                this.props.updateFunc(this.state.lastName);
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

    changeUpdating = () => {
        this.setState({ updating: !this.state.updating });
    }

    render() {
        let title = this.props.firstName ? "First Name" : this.props.lastName ? "Last Name" : this.props.email ? "Email" : "Password";
        let value = this.props.firstName ? this.props.firstName : this.props.lastName ? this.props.lastName : this.props.email ? this.props.email : this.props.password;

        if(this.state.updating) {
            return (
                <div className="profile-info">
                    <h4>{title}: </h4>
                    <input defaultValue={value} onChange={evt => this.updateValue(evt)}></input>
                    <div>
                        <button className="edit-profile-info-button" onClick={this.editInfo}>Submit Edits</button>
                        <button className="edit-profile-info-cancel" onClick={this.changeUpdating}>Cancel</button>
                    </div>
                </div>
            );
        } else {
            return(
                <div className="profile-info">
                    <h4>{title}: </h4>
                    <p>{value}</p>
                    <button className="profile-info-button" onClick={this.changeUpdating}>Edit</button>
                </div>
            );
        }
    }
};

class ProfileDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "Loading...",
            password: "Loading...",
            firstName: "Loading...",
            lastName: "Loading...",
            updated: false
        };
    }

    componentDidMount = () => {
        this.parseDetails();
    }

    parseDetails = () => {
            this.setState({
                firstName: this.props.profileData.first_name,
                lastName: this.props.profileData.last_name,
                email: this.props.profileData.email,
                password: this.props.profileData.password
            });
    }

    updateFirstName = async (newName) => {
        const request = {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: this.state.email,
                first_name: newName
            })
        }
        const response = await fetch(`http://localhost:8000/Profile/UpdateDetails`, request);
        if(response.status === 200) {
            let parsed = await response.json();
            this.setState({ firstName: newName, updated: true });
        } else {
            console.log("Account first name update FAILED, ERROR " + response.status);
        }
    }

    updateLastName = async (newName) => {
        const request = {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: this.state.email,
                last_name: newName
            })
        }
        const response = await fetch(`http://localhost:8000/Profile/UpdateDetails`, request);
        if(response.status === 200) {
            let parsed = await response.json();
            this.setState({ lastName: newName, updated: true });
        } else {
            console.log("Account last name update FAILED, ERROR " + response.status);
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
                email: this.state.email,
                new_email: newEmail
            })
        }
        const response = await fetch(`http://localhost:8000/Profile/UpdateDetails`, request);
        if(response.status === 200) {
            let parsed = await response.json();
            this.setState({ email: newEmail, updated: true });
            this.props.updateId(newEmail);
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
                email: this.state.email,
                password: newPassword
            })
        }
        const response = await fetch(`http://localhost:8000/Profile/UpdateDetails`, request);
        if(response.status === 200) {
            let parsed = await response.json();
            this.setState({ password: newPassword, updated: true });
        } else {
            console.log("Account password update FAILED, ERROR " + response.status);
        }
    }

    render() {
        return (
            <div>
                <h3>Profile Details</h3>
                {
                    this.state.firstName === "Loading..." ? <div>Loading...</div> :
                    <ProfileInfo firstName={this.state.firstName} updateFunc={this.updateFirstName}/>
                }
                {
                    this.state.lastName === "Loading..." ? <div>Loading...</div> :
                    <ProfileInfo lastName={this.state.lastName} updateFunc={this.updateLastName}/>
                }
                {
                    this.state.email === "Loading..." ? <div>Loading...</div> :
                    <ProfileInfo email={this.state.email} updateFunc={this.updateEmail}/>
                }
                {
                    this.state.email === "Loading..." ? <div>Loading...</div> :
                    <ProfileInfo password={this.state.password} updateFunc={this.updatePassword}/>
                }
                {
                    this.state.updated &&
                    <div className="info-updated">Profile information updated successfully</div>
                }
            </div>
        );
    }
}
  
export default ProfileDetails;