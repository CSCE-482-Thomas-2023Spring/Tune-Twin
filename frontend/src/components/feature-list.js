import React, { Component } from 'react';
import "../style/profile.css";

class FeatureList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            featureLists: {},
        };
    }

    componentDidMount = () => {
        console.log("Mounted");
        this.fetchFeatureLists();
    }

    fetchFeatureLists = () => {
        console.log("Fetched");
        this.setState({ featureLists: { 
            "Big&Bubbly": "loudness:loud, tempo:high",
            "Dance Master": "loudness: loud, tempo:high"
        } });
    }

    render() {
        return (
            <div>
                <h3>Saved Filters</h3>
                {
                    Object.keys(this.state.featureLists).length > 0 ? 
                    Object.keys(this.state.featureLists).map((key) => <div key={key}>{key}: {this.state.featureLists[key]}</div>) :
                    <div>No features lists!</div>
                }
            </div>
        );
    }
}
  
export default FeatureList;