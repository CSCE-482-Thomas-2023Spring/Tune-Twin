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
   const handleResults = (event) => {
    // make API call to fetch results
    fetch("http://127.0.0.1:8000/Music?song_id=5")
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
      });
   }

    
  
    return (
  
      <div className="search-bar"> {/* Search bar component */}
        <div className="wrapper drop-shadow"> {/* Encapsulates search bar component */}
  
          {/* Search query */}
          <input className="search-txt"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            placeholder="Type to Search"
          />
  
          {/* Search button */}
          <button className="search-button" onClick={handleResults}>
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
                // Call REST API when button is clicked
                onClick={handleResults} style={{ cursor: "pointer" }}>
              </div>
            ))}
          </div>
  
        )}
      </div>
  
    );  

};

export default Searchbar_Component;
