import '../style/searchbar.css';
import { useEffect, useState, useRef } from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

function Searchbar(props) {

  const [searchString, setSearchString] = useState("");
  const [usePropsSearchString, setUsePropsSearchString] = useState(true);
  const [songResults, setSongResults] = useState([]);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (usePropsSearchString && searchString === "" && props.searchString) {
      setSearchString(props.searchString);
      setUsePropsSearchString(false);
    } else if (searchString === props.searchString) {
      return;
    } else if (searchString.length > 0) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
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
          } else {
            console.error('Error fetching autocomplete suggestions:', response.status);
          }
        } catch (error) {
          console.error('Error fetching autocomplete suggestions:', error);
        }
      }, 500); // Setting 500ms delay
    }
  }, [searchString, props.searchString, usePropsSearchString]);

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchString.trim() === '') {
      return;
    }
    if (songResults.length === 0) {
      return;
    }
    const query = songResults[0].song;
    const trackID = songResults[0].trackID;
    const searchTerm = encodeURIComponent(query);
    const trackIdParam = encodeURIComponent(trackID);
    <Link to={`/reccs?searchTerm=${searchTerm}&trackId=${trackIdParam}`} />
  };

  return (
    <div className="search-bar drop-shadow">
      <div className="wrapper">
        <input className="search-txt"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          placeholder="Type to Search"
        />
        <button className="search-button" onClick={handleSearch}>
          <FontAwesomeIcon icon={solid('magnifying-glass')} />
        </button>
      </div>
      {songResults.length > 0 && searchString.length > 0 && (
        <div className="recc-item" style={{ userSelect: "none" }}>
          {songResults.map((song, index) => (
            <Link
              key={`${song.song}-${index}`}
              to={`/reccs?searchTerm=${encodeURIComponent(song.song)}&trackId=${encodeURIComponent(song.trackID)}`}
            >
              <div className="individual-items">({song.year}) {song.song} - {song.artist}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );

};

export default Searchbar;
