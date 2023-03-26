import React, { Component } from 'react';
import Description from '../components/description.js';
import Searchbar from '../components/searchbar.jsx';
import ReccList from '../components/recc-list.jsx';

class RecPage extends Component {
    state = {
        filtersPresent: false,
        searchString: "",
        spotifyId: ""
    };

    componentDidMount() {
        const searchParams = new URLSearchParams(window.location.search || "");
        const searchTerm = searchParams.get("searchTerm");
        const decodedSearchTerm = decodeURIComponent(searchTerm);
        this.setState({ searchString: decodedSearchTerm });
    }

    filtersPopUp = () => {
        this.setState({ filtersPresent: !this.state.filtersPresent });
    }

    render() {
        return (
            <div className="page-wrapper">
                <div className="row">
                    <Searchbar searchString={this.state.searchString} />
                </div>
                <div className="row">
                    <ReccList />
                </div>
            </div>
        );
    }
}

export default RecPage;