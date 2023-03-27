import React, { Component } from 'react';
import { Description, Searchbar, SearchFilters } from '../components/index.js';

class MainPage extends Component {
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
                {
                    this.state.filtersPresent && <SearchFilters />
                }
            </div>
        );
    }
}

export default MainPage;