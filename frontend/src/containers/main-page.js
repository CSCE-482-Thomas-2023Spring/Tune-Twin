import React, { Component } from 'react';
import { Description, Searchbar, SearchFilters } from '../components/index.js';
import { connect } from 'react-redux';
import { setFilter, clearFilters } from '../redux/actions/filterActions';

class MainPage extends Component {
    state = {
        filtersPresent: false,
        filterButton: "Advanced Filters"
    };

    filtersPopUp = () => {
        const newButtonText = this.state.filterButton === "Advanced Filters" ? "Collapse Filters" : "Advanced Filters";
        this.setState({
            filtersPresent: !this.state.filtersPresent,
            filterButton: newButtonText
        });
    }

    render() {
        return (
            <div className="page-wrapper">
                <Description />
                <div className="search-card">
                    <h2>Song Search</h2>
                    <Searchbar />
                    <button className="filters-button" onClick={this.filtersPopUp}>{this.state.filterButton}</button>
                    {
                        this.state.filtersPresent && (
                            <SearchFilters
                                filters={this.props.filters}
                                setFilter={this.props.setFilter}
                                clearFilters={this.props.clearFilters}
                            />
                        )
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);