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
        this.fetchFeatureLists();
    }

    fetchFeatureLists = () => {
        this.setState({ featureLists: { 
            "Big&Bubbly": "loudness:loud, tempo:high",
            "Dance Master": "loudness: loud, tempo:high"
        } });
    }

    render() {
        return (
            <div>
                {
                    Object.keys(this.state.featureLists).length > 0 ? 
                    Object.keys(this.state.featureLists).map((key) => <div key={key}>{key}: {this.state.featureLists[key]}</div>) :
                    <div>No features lists!</div>
                }
                <button onClick={this.props.toggle}>Collapse Saved Filters</button>
            </div>
        );
    }
}
  
export default FeatureList;