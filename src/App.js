import './App.css';
import React, {useState} from 'react';
import SearchResults from './Components/SearchResults/SearchResults.js';
import PlaylistMenu from './Components/PlaylistMenu/PlaylistMenu.js';
import SearchField from './Components/SearchField/SearchField.js';


function App() {
  const [search, setSearch] = useState(""); // String corresponding of the input of the user for the search.
  const [tracklistToDisplay, setTracklistToDisplay] = useState(); 
  const [isMenuPlaylist, setIsMenuPlaylist] = useState(true); // Boolean to determine if the playlist menu is display or not;
  const [playlists, setPlaylists] = useState({}); // Object of "playlist object", which contain two keys ==> name: string, songs: array. The Array of songs contain "song object".
  const [playlistToDisplay, setPlaylistToDisplay] = useState(); // The playlist to display, this variable contain an object ==> name + songs.
  const [namePlaylistToDisplay, setNamePlaylistToDisplay] = useState(""); // Name of the playlist to display.
  const [message, setMessage] = useState("")
  
  const handleNewName = (e) => {
    setNamePlaylistToDisplay(e.target.value)
  }

  const handleAddPlaylist = (e) => {
    setIsMenuPlaylist(false);
    setPlaylistToDisplay({})
  }

  const handlePlaylistClick = (e) => {
    const playlistName = e.target.className;
    setPlaylistToDisplay(playlists.playlistName);
    setNamePlaylistToDisplay(playlistName);
    setIsMenuPlaylist(false);
  };

  const handleBackToMenu = () => {
    setIsMenuPlaylist(true);
    setNamePlaylistToDisplay("");
  }

  const handleAddTrack = (e) => {
    const idSongToAdd = e.target.songId
    if (!isMenuPlaylist) {
      if (playlists[namePlaylistToDisplay].include(idSongToAdd)) {
        setMessage("This song is already present in the palylist");
        setTimeout(() => setMessage(""), 2000);
      } else {
        playlists[namePlaylistToDisplay][idSongToAdd] = tracklistToDisplay.idSongToAdd;
      }     
    }
  }

  const handleRemoveTrack = (e) => {
    const idSongToRemove = e.target.songId
    delete playlists[namePlaylistToDisplay][idSongToRemove]; 
  }

  const handleInputSearch = (e) => {
    setSearch(e.target.value);
  }

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    // tracklist = fetch 
  }

  return (
    <div className="App">
      <SearchField 
        search={search} 
        handleInputSearch={handleInputSearch} 
        handleSubmitSearch={handleSubmitSearch} />
      <p>{message}</p>
      <SearchResults 
        tracklistToDisplay={tracklistToDisplay} 
        handleAddTrack={handleAddTrack} />
      <PlaylistMenu 
        playlists={playlists} 
        isMenuPlaylist={isMenuPlaylist}
        playlistToDisplay={playlistToDisplay}
        namePlaylistToDisplay={namePlaylistToDisplay}
        handleNewName={handleNewName}
        handleAddPlaylist={handleAddPlaylist} 
        handlePlaylistClick={handlePlaylistClick}
        handleBackToMenu={handleBackToMenu}
        handleRemoveTrack={handleRemoveTrack} 
        />          
    </div>
  );
}

export default App;
