import React, { Component } from 'react';
import { NavBar, Description, Searchbar_Component, SearchFilters } from '../components/index.js';

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
                <br></br>
                <Searchbar_Component />
                <button className="filters-button" onClick={this.filtersPopUp}>Advanced Filters</button>
                {
                    this.state.filtersPresent ? <SearchFilters /> : <div></div>
                }
            </div>
        );
    }
}
  
export default MainPage;