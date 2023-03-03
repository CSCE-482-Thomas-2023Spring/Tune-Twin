import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import fetchSongs from "./api/spotify";
import './style/searchbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'

function App() {

  const [searchString, setSearchString] = useState("");
  const [songResults, setSongResults] = useState([]);

  useEffect(() => {
    async function fetchSongResults() {
      setSongResults(await fetchSongs(searchString));
    }
    fetchSongResults();
  }, [searchString]);

  return (
    <div class="search-bar drop-shadow">
      <div class="wrapper">
        <input class="search-txt"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          placeholder="Type to Search"
        />
        <a class="search-button" href="#">
          <FontAwesomeIcon icon={solid('magnifying-glass')} />
        </a>
      </div>
      {searchString && (
        <div class = "recc-item">
          {songResults.map((songName) => (
            <div class = "list">{songName}</div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
