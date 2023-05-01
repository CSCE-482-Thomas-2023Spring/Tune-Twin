import React from 'react';
import "../style/search-filters.css";

const SearchFilters = ({ filters, setFilter, clearFilters }) => {

    //Acousticness: 0 <= x <= 1
    const acoustics = ['N/A', 'not acoustic', 'slightly acoustic', 'acoustic'];
    //Danceability: 0 <= x <= 1
    const danceability = ['N/A', 'low', 'moderate', 'high'];
    //Energy: 0 <= x <= 1
    const energy = ['N/A', 'low', 'moderate', 'high'];
    //Mode: 0 <= x <= 1
    const mode = ['N/A', 'major', 'minor'];
    //Key: 0 <= x <= 11
    //0: C, 1:C#, 2:D, 3:D#, 4:E, 5:F, 6:F#, 7:G, 8:G#, 9:A, 10:A#, 11:B
    const keys = ['N/A', 'C', 'C-Sharp/D-Flat', 'D', 'D-Sharp/E-Flat', 'E', 'F', 'F-Sharp/G-Flat', 'G', 'G-Sharp/A-Flat', 'A', 'A-Sharp/B-Flat', 'B'];
    //Liveness: 0 <= x < inf
    const liveness = ['N/A', 'not live', 'live'];
    //Loudness: -60 <= x <= 0
    const loudness = ['N/A', 'quiet', 'moderate', 'loud'];
    //Tempo: 0 <= x <= 1000
    const tempo = ['N/A', 'slow', 'moderate', 'fast'];
    //Valence: 0 <= x <= 1
    const valence = ['N/A', 'happy/positive', 'neutral', 'dark/sad/negative'];

    const handleFilterChange = (filterType, filterValue) => {
        setFilter(filterType, filterValue);
    };

    const handleClearFilters = () => {
        clearFilters();
    };

    return (
        <div className="filters-card">
            <h3>Filters</h3>
            <div className="filter-wrapper">
                <label className="filter-label" htmlFor="acousticness-select">Select acousticness: </label>
                <select className="filter-label" name="acousticness-select" id="sf-acousticness" value={filters.acoustics} onChange={(e) => handleFilterChange('acoustics', e.target.value)}>
                    {
                        acoustics.map((element, i) => <option value={element} key={i}>{element}</option>)
                    }
                </select>
            </div>
            <div className="filter-wrapper">
                <label className="filter-label" htmlFor="danceability-select">Select danceability: </label>
                <select className="filter-label" name="danceability-select" id="sf-danceability" value={filters.danceability} onChange={(e) => handleFilterChange('danceability', e.target.value)}>
                    {
                        danceability.map((element, i) => <option value={element} key={i}>{element}</option>)
                    }
                </select>
            </div>
            <div className="filter-wrapper">
                <label className="filter-label" htmlFor="energy-select">Select energy: </label>
                <select className="filter-label" name="energy-select" id="sf-energy" value={filters.energy} onChange={(e) => handleFilterChange('energy', e.target.value)}>
                    {
                        energy.map((element, i) => <option value={element} key={i}>{element}</option>)
                    }
                </select>
            </div>
            <div className="filter-wrapper">
                <label className="filter-label" htmlFor="key-select">Select key: </label>
                <select className="filter-label" name="key-select" id="sf-key" value={filters.keys} onChange={(e) => handleFilterChange('keys', e.target.value)}>
                    {
                        keys.map((element, i) => <option value={element} key={i}>{element}</option>)
                    }
                </select>
            </div>
            <div className="filter-wrapper">
                <label className="filter-label" htmlFor="liveness-select">Select liveness: </label>
                <select className="filter-label" name="liveness-select" id="sf-liveness" value={filters.liveness} onChange={(e) => handleFilterChange('liveness', e.target.value)}>
                    {
                        liveness.map((element, i) => <option value={element} key={i}>{element}</option>)
                    }
                </select>
            </div>
            <div className="filter-wrapper">
                <label className="filter-label" htmlFor="loudness-select">Select loudness: </label>
                <select className="filter-label" name="loudness-select" id="sf-loudness" value={filters.loudness} onChange={(e) => handleFilterChange('loudness', e.target.value)}>
                    {
                        loudness.map((element, i) => <option value={element} key={i}>{element}</option>)
                    }
                </select>
            </div>
            <div className="filter-wrapper">
                <label className="filter-label" htmlFor="mode-select">Select mode: </label>
                <select className="filter-label" name="mode-select" id="sf-mode" value={filters.mode} onChange={(e) => handleFilterChange('mode', e.target.value)}>
                    {
                        mode.map((element, i) => <option value={element} key={i}>{element}</option>)
                    }
                </select>
            </div>
            <div className="filter-wrapper">
                <label className="filter-label" htmlFor="tempo-select">Select tempo: </label>
                <select className="filter-label" name="tempo-select" id="sf-tempo" value={filters.tempo} onChange={(e) => handleFilterChange('tempo', e.target.value)}>
                    {
                        tempo.map((element, i) => <option value={element} key={i}>{element}</option>)
                    }
                </select>
            </div>
            <div className="filter-wrapper">
                <label className="filter-label" htmlFor="valence-select">Select valence: </label>
                <select className="filter-label" name="valence-select" id="sf-valence" value={filters.valence} onChange={(e) => handleFilterChange('valence', e.target.value)}>
                    {
                        valence.map((element, i) => <option value={element} key={i}>{element}</option>)
                    }
                </select>
            </div>
            <button className="clear-filters-button" onClick={handleClearFilters}>Clear Filters</button>
        </div>
    );
}

export default SearchFilters;