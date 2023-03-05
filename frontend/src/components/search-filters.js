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
        var acoustics = document.getElementById("sf-acousticness");
        acoustics.setAttribute("value", "N/A");
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
                <label for="acousticness-select">Select acousticness: </label>
                <select name="acousticness-select" id="sf-acousticness">
                    {
                        acoustics.map(element => <option value={element}>{element}</option>)
                    }
                </select><br></br>
                <label for="danceability-select">Select danceability: </label>
                <select name="danceability-select" id="sf-danceability">
                    {
                        danceability.map(element => <option value={element}>{element}</option>)
                    }
                </select><br></br>
                <label for="energy-select">Select energy: </label>
                <select name="energy-select" id="sf-energy">
                    {
                        energy.map(element => <option value={element}>{element}</option>)
                    }
                </select><br></br>
                <label for="key-select">Select key: </label>
                <select name="key-select" id="sf-key">
                    {
                        keys.map(element => <option value={element}>{element}</option>)
                    }
                </select><br></br>
                <label for="liveness-select">Select liveness: </label>
                <select name="liveness-select" id="sf-liveness">
                    {
                        liveness.map(element => <option value={element}>{element}</option>)
                    }
                </select><br></br>
                <label for="loudness-select">Select loudness: </label>
                <select name="loudness-select" id="sf-loudness">
                    {
                        loudness.map(element => <option value={element}>{element}</option>)
                    }
                </select><br></br>
                <label for="tempo-select">Select tempo: </label>
                <select name="tempo-select" id="sf-tempo">
                    {
                        tempo.map(element => <option value={element}>{element}</option>)
                    }
                </select><br></br>
                <button onClick={this.clearFilters}>Clear Filters</button>
            </div>
        );
    }
}
  
export default SearchFilters;