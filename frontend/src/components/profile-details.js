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
                console.log(this.state.name);
            }
        } else if(this.props.email) {
            if(this.props.email === this.state.email) {
                console.log("No change detected");
            } else {
                console.log(this.state.email);
            }
        } else {
            if(this.props.password === this.state.password) {
                console.log("No change detected");
            } else {
                console.log(this.state.password);
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
        this.fetchDetails();
    }

    fetchDetails = () => {
        let username = "dexter@email.net";
        fetch(`http://localhost:8000/GetDetails?username=${username}`)
        .then((response) => response.json())
        .then((parsed) => {
            this.setState({
                email: parsed.email,
                password: parsed.password,
                name: parsed.name
            });
        });
    }

    render() {
        return (
            <div>
                <h3>Profile Details</h3>
                {
                    this.state.name === "Loading..." ? <div>Loading...</div> :
                    <ProfileInfo name={this.state.name} />
                }
                {
                    this.state.email === "Loading..." ? <div>Loading...</div> :
                    <ProfileInfo email={this.state.email} />
                }
                {
                    this.state.email === "Loading..." ? <div>Loading...</div> :
                    <ProfileInfo password={this.state.password} />
                }
            </div>
        );
    }
}
  
export default ProfileDetails;