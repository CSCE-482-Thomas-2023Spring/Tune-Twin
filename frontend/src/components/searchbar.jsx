import '../style/searchbar.css';
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'



function Searchbar(props) {

  const [searchString, setSearchString] = useState(""); /**<  Using the useState hook to change the search string as setSearchString updates it*/
  const [usePropsSearchString, setUsePropsSearchString] = useState(true);
  const [songResults, setSongResults] = useState([]); /**<  Using the useState hook to change the search results (as an array)*/

  /**
   * Using a hook to fetch song results as searchString changes.
  */
  useEffect(() => {
    if (usePropsSearchString && searchString === "" && props.searchString) {
      setSearchString(props.searchString);
      setUsePropsSearchString(false);
    } else if (searchString === props.searchString) {
      return;
    } else if (searchString.length > 0) { // Only fetch autocomplete suggestions if searchString is not empty
      async function fetchAutocompleteSuggestions() {
        const response = await fetch(`http://127.0.0.1:8000/Autocomplete?query=${searchString}`);
        if (response.ok) {
          const data = await response.json();
          const items = data["tracks"]["items"];
          const merged_list = items.map(item => {
            return {
              song: item["name"],
              artist: item["artists"][0]["name"],
              link: item["external_urls"],
              album: item["album"]["images"][1],
              year: item["album"]["release_date"].split("-")[0]
            };
          });
          setSongResults(merged_list);
        } else {
          console.error('Error fetching autocomplete suggestions:', response.status);
        }
      }
      fetchAutocompleteSuggestions();
    }
  }, [searchString, props.searchString, usePropsSearchString]);

  /**
   * Search function
  */
  const handleSearch = (event) => {
    event.preventDefault();
    if (searchString.trim() === '') {
      return;
    }
    if (songResults.length === 0) {
      return;
    }
    const query = songResults[0].song;
    const searchTerm = encodeURIComponent(query);
    window.location.href = `/reccs?searchTerm=${searchTerm}`;
  };

  return (

    <div className="search-bar drop-shadow"> {/* Search bar component */}
      <div className="wrapper"> {/* Encapsulates search bar component */}

        <input className="search-txt"
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
      {songResults.length > 0 && searchString.length > 0 && (
        <div className="recc-item">
          {songResults.map((song, index) => (
            <div
              key={`${song.song}-${index}`}
              className="individual-items"
              onClick={() => {
                const searchTerm = encodeURIComponent(song.song);
                window.location.href = `/reccs?searchTerm=${searchTerm}`;
              }}
              style={{ cursor: "pointer" }}
            >
              <div>({song.year}) {song.song} - {song.artist}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

};

export default Searchbar;
