import React, { Component } from 'react';
import Searchbar from '../components/searchbar.jsx';
import ReccList from '../components/recc-list.jsx';
import SearchFilters from '../components/search-filters.js';
import { connect } from 'react-redux';
import { setFilter, clearFilters } from '../redux/actions/filterActions';

class RecPage extends Component {
    state = {
        filtersPresent: false
    };

    filtersPopUp = () => {
        this.setState({ filtersPresent: !this.state.filtersPresent });
    }

    componentDidMount() {
        const searchParams = new URLSearchParams(window.location.search || "");
        const searchTerm = searchParams.get("searchTerm");
        const decodedSearchTerm = decodeURIComponent(searchTerm);
        this.setState({ searchString: decodedSearchTerm });

        const trackId = searchParams.get("trackId");
        const decodedTrackId = decodeURIComponent(trackId);
        this.setState({ spotifyId: decodedTrackId });
    }

    render() {
        return (
            <div className="page-wrapper">
                <div className="row">
                    <Searchbar searchString={this.state.searchString} />
                </div>
                <div className="row">
                    <button className="filters-button" onClick={this.filtersPopUp}>Advanced Filters</button>
                </div>
                {
                    this.state.filtersPresent && (
                        <SearchFilters
                            filters={this.props.filters}
                            setFilter={this.props.setFilter}
                            clearFilters={this.props.clearFilters}
                        />
                    )
                }
                <div className="row">
                <ReccList spotifyId={this.state.spotifyId} userId={this.props.userId} filters={this.props.filters}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    filters: state.filter
});

const mapDispatchToProps = (dispatch) => ({
    setFilter: (filterType, filterValue) => dispatch(setFilter(filterType, filterValue)),
    clearFilters: () => dispatch(clearFilters())
});

export default connect(mapStateToProps, mapDispatchToProps)(RecPage);