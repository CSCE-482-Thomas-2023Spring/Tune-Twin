import React, { Component } from 'react';
import NavBar from '../components/navbar.js';
import SearchFilters from '../components/search-filters.js';
import Description from '../components/description.js';
import Searchbar from '../components/searchbar.jsx';

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