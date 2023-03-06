import React, { Component } from 'react';
import NavBar from '../components/navbar.js';
import SearchFilters from '../components/search-filters.js';
import Description from '../components/description.js';
import '../style/search-filters.css';

class MainPage extends Component {
    state = {
        filtersPresent: false
    };

    filtersPopUp = () => {
        this.setState({filtersPresent: !this.state.filtersPresent});
    }

    render() {
        return (
            <div>
                <NavBar />
                <Description />
                <button className="filters-button" onClick={this.filtersPopUp}>Advanced Filters</button>
                {
                    this.state.filtersPresent ? <SearchFilters /> : <div></div>
                }
            </div>
        );
    }
}
  
export default MainPage;