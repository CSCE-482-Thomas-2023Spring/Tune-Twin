import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import fetchSongs from "./api/spotify";

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
      <div>
        <div>
          <input
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
          />
        </div>
        {searchString && (
          <div>
            {songResults.map((songName) => (
              <div>{songName}</div>
            ))}
          </div>
        )}
      </div>
  );
}

export default App;
