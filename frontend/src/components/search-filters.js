import React, { Component } from 'react';
import "../style/search-filters.css";

class SearchFilters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            acoustics: 'N/A',
            danceability: 'N/A',
            energy: 'N/A',
            keys: 'N/A',
            liveness: 'N/A',
            loudness: 'N/A',
            tempo: 'N/A'
        };
    }

    clearFilters = () => {
        this.setState({
            acoustics: 'N/A',
            danceability: 'N/A',
            energy: 'N/A',
            keys: 'N/A',
            liveness: 'N/A',
            loudness: 'N/A',
            tempo: 'N/A'
        });
    }

    render() {
        const userHasPlaylists = this.props.playlists ? true : false;
        const userHasFilters = this.props.filters ? true : false;

        //Acousticness: 0 <= x <= 1
        const acoustics = ['N/A', 'not acoustic', 'slightly acoustic', 'acoustic'];
        //Danceability: 0 <= x <= 1
        const danceability = ['N/A', 'low', 'moderate', 'high'];
        //Energy: 0 <= x <= 1
        const energy = ['N/A', 'low', 'moderate', 'high'];
        //Key: 0 <= x <= 11
        //0: C, 1:C#, 2:D, 3:D#, 4:E, 5:F, 6:F#, 7:G, 8:G#, 9:A, 10:A#, 11:B
        const keys = ['N/A', 'C', 'C-Sharp/D-Flat', 'D', 'D-Sharp/E-Flat', 'E', 'F', 'F-Sharp/G-Flat', 'G', 'G-Sharp/A-Flat', 'A', 'A-Sharp/B-Flat', 'B'];
        //Liveness: 0 <= x < inf
        const liveness = ['N/A', 'not live', 'live'];
        //Loudness: -60 <= x <= 0
        const loudness = ['N/A', 'quiet', 'moderate', 'loud'];
        //Tempo: 0 <= x <= 1000
        const tempo = ['N/A', 'slow', 'moderate', 'fast'];
        return (
            <div className="filters-card">
                <h3>Filters</h3>
                <label htmlFor="acousticness-select">Select acousticness: </label>
                <select name="acousticness-select" id="sf-acousticness" value={this.state.acoustics} onChange={(e) => this.setState({acoustics: e.target.value})}>
                    {
                        acoustics.map((element, i) => <option value={element} key={i}>{element}</option>)
                    }
                </select><br></br>
                <label htmlFor="danceability-select">Select danceability: </label>
                <select name="danceability-select" id="sf-danceability" value={this.state.danceability} onChange={(e) => this.setState({danceability: e.target.value})}>
                    {
                        danceability.map((element, i) => <option value={element} key={i}>{element}</option>)
                    }
                </select><br></br>
                <label htmlFor="energy-select">Select energy: </label>
                <select name="energy-select" id="sf-energy" value={this.state.energy} onChange={(e) => this.setState({energy: e.target.value})}>
                    {
                        energy.map((element, i) => <option value={element} key={i}>{element}</option>)
                    }
                </select><br></br>
                <label htmlFor="key-select">Select key: </label>
                <select name="key-select" id="sf-key" value={this.state.keys} onChange={(e) => this.setState({keys: e.target.value})}>
                    {
                        keys.map((element, i) => <option value={element} key={i}>{element}</option>)
                    }
                </select><br></br>
                <label htmlFor="liveness-select">Select liveness: </label>
                <select name="liveness-select" id="sf-liveness" value={this.state.liveness} onChange={(e) => this.setState({liveness: e.target.value})}>
                    {
                        liveness.map((element, i) => <option value={element} key={i}>{element}</option>)
                    }
                </select><br></br>
                <label htmlFor="loudness-select">Select loudness: </label>
                <select name="loudness-select" id="sf-loudness" value={this.state.loudness} onChange={(e) => this.setState({loudness: e.target.value})}>
                    {
                        loudness.map((element, i) => <option value={element} key={i}>{element}</option>)
                    }
                </select><br></br>
                <label htmlFor="tempo-select">Select tempo: </label>
                <select name="tempo-select" id="sf-tempo" value={this.state.tempo} onChange={(e) => this.setState({tempo: e.target.value})}>
                    {
                        tempo.map((element, i) => <option value={element} key={i}>{element}</option>)
                    }
                </select><br></br>
                <button onClick={this.clearFilters}>Clear Filters</button>
            </div>
        );
    }
}
  
export default SearchFilters;