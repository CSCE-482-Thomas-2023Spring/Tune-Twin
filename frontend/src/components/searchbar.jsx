import '../style/searchbar.css';
import { useEffect, useState } from "react";
import fetchSongs from "../api/spotify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

function Searchbar_Component(props){

    const [searchString, setSearchString] = useState(""); /**<  Using the useState hook to change the search string as setSearchString updates it*/
    const [songResults, setSongResults] = useState([]); /**<  Using the useState hook to change the search results (as an array)*/
  
    /**
     * Using a hook to fetch song results as searchString changes.
    */
    useEffect(() => {
      async function fetchSongResults() {
        setSongResults(await fetchSongs(searchString));
      }
      fetchSongResults();
    }, [searchString]);
  
    /**
     * Search function
    */
    const handleSearch = (event) => {
  
      // Behavior override
      event.preventDefault();
  
      // Don't search if empty string
      if (searchString.trim() === '') {
        return;
      }
  
      // Don't search if there are no song results
      if (songResults.length === 0) {
        return;
      }
  
      // Google the first song result when search button is clicked
      const query = songResults[0];
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    };
  
    return (
  
      <div class="search-bar drop-shadow"> {/* Search bar component */}
        <div class="wrapper"> {/* Encapsulates search bar component */}
  
          {/* Search query */}
          <input class="search-txt"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            placeholder="Type to Search"
          />
  
          {/* Search button */}
          <button className="search-button" onClick={handleSearch}>
            <FontAwesomeIcon icon={solid('magnifying-glass')} />
          </button>
  
        </div>
  
        {/* Recommendation element */}
        {searchString && (
          <div className="recc-item">
            {songResults.map((songName) => (
              <div
                key={songName}
                className="individual-items"
                // Google element that's clicked
                onClick={() =>
                  (window.location.href = `https://www.google.com/search?q=${encodeURIComponent(songName)}`)}>
                {songName}
              </div>
            ))}
          </div>
  
        )}
      </div>
  
    );  

};

export default Searchbar_Component;
