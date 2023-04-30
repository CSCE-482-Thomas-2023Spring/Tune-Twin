import '../style/searchbar.css';
import { useEffect, useState, useRef } from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

function Searchbar(props) {
  // State variables
  const [searchString, setSearchString] = useState("");
  const [usePropsSearchString, setUsePropsSearchString] = useState(true);
  const [songResults, setSongResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const timeoutRef = useRef(null);
  const searchbarRef = useRef(null);

  // Handler for selecting a song from the dropdown
  const handleSelectSong = (songName) => {
    setSearchString(songName);
    setShowDropdown(false);
  };

  useEffect(() => {
    // Check if the search string is received from props and set it
    if (usePropsSearchString && searchString === "" && props.searchString) {
      setSearchString(props.searchString);
      setUsePropsSearchString(false);
    } else if (searchString === props.searchString) {
      return;
    } else if (searchString.trim().length > 0) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      // Delay the autocomplete API call
      timeoutRef.current = setTimeout(async () => {
        try {
          // Fetch autocomplete suggestions
          const response = await fetch(`http://127.0.0.1:8000/Autocomplete?query=${searchString}`);
          if (response.ok) {
            const data = await response.json();
            const items = data["tracks"]["items"];
            const merged_list = items.map(item => {
              return {
                song: item["name"],
                trackID: item["id"],
                artist: item["artists"][0]["name"],
                link: item["external_urls"],
                album: item["album"]["images"][1],
                year: item["album"]["release_date"].split("-")[0]
              };
            });
            setSongResults(merged_list);
            setShowDropdown(true);
          } else {
            console.error('Error fetching autocomplete suggestions:', response.status);
          }
        } catch (error) {
          console.error('Error fetching autocomplete suggestions:', error);
        }
      }, 500); // Setting 500ms delay
    }
  }, [searchString, props.searchString, usePropsSearchString]);

  useEffect(() => {
    // Handler for closing the dropdown when clicked outside
    const handleClickOutside = (event) => {
      if (searchbarRef.current && !searchbarRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchbarRef]);

  // Handler for search button click (deprecated)
  // const handleSearch = (event) => {
  //   event.preventDefault();
  //   if (searchString.trim() === '') {
  //     return;
  //   }
  //   if (songResults.length === 0) {
  //     return;
  //   }
  //   const query = songResults[0].song;
  //   const trackID = songResults[0].trackID;
  //   const searchTerm = encodeURIComponent(query);
  //   const trackIdParam = encodeURIComponent(trackID);
  //   // Navigate to the search results page

  //   <Link
  //     to={`/reccs?searchTerm=${searchTerm}&trackId=${trackIdParam}`}
  //     onClick={() => handleSelectSong(query)}
  //   />
  // };

  return (
    <div className="search-bar drop-shadow" ref={searchbarRef}>
      <div className="wrapper">
        {/* Search input */}
        <input
          className="search-txt"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          onClick={() => {
            if (searchString && songResults.length === 0) {
              timeoutRef.current = setTimeout(async () => {
                try {
                  const response = await fetch(`http://127.0.0.1:8000/Autocomplete?query=${searchString}`);
                  if (response.ok) {
                    const data = await response.json();
                    const items = data["tracks"]["items"];
                    const merged_list = items.map(item => {
                      return {
                        song: item["name"],
                        trackID: item["id"],
                        artist: item["artists"][0]["name"],
                        link: item["external_urls"],
                        album: item["album"]["images"][1],
                        year: item["album"]["release_date"].split("-")[0]
                      };
                    });
                    setSongResults(merged_list);
                    setShowDropdown(true);
                  } else {
                    console.error('Error fetching autocomplete suggestions:', response.status);
                  }
                } catch (error) {
                  console.error('Error fetching autocomplete suggestions:', error);
                }
              }, 500); // Setting 500ms delay
            } else {
              setShowDropdown(true);
            }
          }}
          placeholder="Type Song to Search"
        />

        {/* Search button */}
        <button className="search-button no-pointer">
          <FontAwesomeIcon icon={solid('magnifying-glass')} />
        </button>

        {/* Dropdown results */}
        {showDropdown && songResults.length > 0 && searchString.length > 0 && (
          <div className="recc-item" style={{ userSelect: "none" }}>
            {songResults.map((song, index) => (
              <Link
                key={`${song.song}-${index}`}
                to={`/reccs?searchTerm=${encodeURIComponent(song.song)}&trackId=${encodeURIComponent(song.trackID)}`}
                onClick={() => handleSelectSong(song.song)}
              >
                <div className="individual-items">({song.year}) {song.song} - {song.artist}</div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Searchbar;