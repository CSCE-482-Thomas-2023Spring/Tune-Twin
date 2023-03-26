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

        const trackId = searchParams.get("trackId");
        const decodedTrackId = decodeURIComponent(trackId);
        this.setState({ spotifyId: decodedTrackId });
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
                    <ReccList spotifyId={this.state.spotifyId} />
                </div>
            </div>
        );
    }
}

export default RecPage;