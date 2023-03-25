import React, { Component } from 'react';
import Description from '../components/description.js';
import Searchbar from '../components/searchbar.jsx';

class RecPage extends Component {
    state = {
        filtersPresent: false
    };

    filtersPopUp = () => {
        this.setState({ filtersPresent: !this.state.filtersPresent });
    }

    render() {
        return (
            <div className="page-wrapper">
                <Description />
                {/* rename search bar */}
                {/* <div className="row"> */}
                    <Searchbar />
                    <button className="filters-button" onClick={this.filtersPopUp}>Advanced Filters</button>
                {/* </div> */}
            </div>
        );
    }
}

export default RecPage;