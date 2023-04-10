import React, { Component } from 'react';
import { Description, Searchbar, SearchFilters } from '../components/index.js';
import { connect } from 'react-redux';
import { setFilter, clearFilters } from '../redux/actions/filterActions';

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
                <div className="col">
                    <Searchbar />
                </div>
                <div className="col">
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