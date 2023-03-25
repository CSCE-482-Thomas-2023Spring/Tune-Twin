import React, { Component } from 'react';
import "../style/profile.css";

class FeatureListElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            content: this.props.content,
            expand: false
        };
    }

    expandFeatureList = () => {
        this.setState({ expand: !this.state.expand});
    }

    render() {
        return (
            <div className="feature-list-element">
                <div className="fle-header">
                    <h4>{this.state.title}</h4>
                    {
                        this.state.expand ?
                        <button className="fle-button" onClick={this.expandFeatureList}>Collapse</button> :
                        <button className="fle-button" onClick={this.expandFeatureList}>Expand</button>
                    }
                </div>
                {
                    this.state.expand &&
                    <div>
                        <ul className="fle-content">
                            {
                                this.state.content.map((elem, i) => <li key={i}><div>{elem}</div></li>)
                            }
                        </ul>
                        <div className="fle-ub-wrapper">
                        <button className="fle-update-button">Update Filter Set</button>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

class FeatureList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            featureLists: [],
        };
    }

    componentDidMount = () => {
        this.parseFeatureLists();
    }

    parseFeatureLists = () => {
        console.log(this.props.fList)
        this.setState({ featureLists: this.props.fList });
    }

    render() {
        return (
            <div>
                {
                    Object.keys(this.state.featureLists).length > 0 ? 
                    this.state.featureLists.map((elem, i) => 
                        Object.keys(elem).map((key) => <FeatureListElement key={i} title={key} content={elem[key]}/>)) :
                    <div>No features lists!</div>
                }
                <button onClick={this.props.toggle}>Collapse Saved Filters</button>
            </div>
        );
    }
}
  
export default FeatureList;