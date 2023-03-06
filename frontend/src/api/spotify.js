const songs = [
    "Bohemian Rhapsody",
    "Blinding Lights",
    "Stairway to Heaven",
    "Bad Guy",
    "I Will Always Love You",
    "Lose You To Love Me",
    "Big Iron",
    "Sweet Child O' Mine",
    "The A Team",
    "One Dance"
  ];
  
  async function fetchSongs(searchString) {
    return songs.filter((songName) =>
      songName.toLowerCase().includes(searchString.toLowerCase())
    );
  }
  
  export default fetchSongs;