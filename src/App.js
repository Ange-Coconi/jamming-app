import './App.css';
import React, {useState} from 'react';
import SearchResults from './Components/SearchResults/SearchResults.js';
import PlaylistMenu from './Components/PlaylistMenu/PlaylistMenu.js';
import SearchField from './Components/SearchField/SearchField.js';
import ressources from "./Components/ressources/data.js"


function App() {
  const [search, setSearch] = useState(""); // String corresponding of the input of the user for the search.
  const [tracklistToDisplay, setTracklistToDisplay] = useState(); 
  const [isMenuPlaylist, setIsMenuPlaylist] = useState(false); // Boolean to determine if the playlist menu is display or not;
  const [playlists, setPlaylists] = useState({}); // Object of "playlist object", which contain two keys ==> name: string, songs: array. The Array of songs contain "song object".
  const [playlistToDisplay, setPlaylistToDisplay] = useState({}); // The playlist to display, this variable contain an object ==> name + songs.
  const [namePlaylistToDisplay, setNamePlaylistToDisplay] = useState("New Playlist"); // Name of the playlist to display.
  const [keepPlaylistName, setKeepPlaylistName] = useState(true)
  const [message, setMessage] = useState("")
  
  const handleNewName = (e) => {
    setNamePlaylistToDisplay(e.target.value);
  };

  const handleModifPlaylistName = () => {
    setKeepPlaylistName(false);
  };

  const handleSubitNamePlaylist = () => {
    setKeepPlaylistName(true);
  };

  const handleAddPlaylist = (e) => {
    setIsMenuPlaylist(false);
    setPlaylistToDisplay({})
  };

  const handlePlaylistClick = (e) => {
    const playlistName = e.target.className;
    setPlaylistToDisplay(playlists.playlistName);
    setNamePlaylistToDisplay(playlistName);
    setIsMenuPlaylist(false);
  };

  const handleBackToMenu = () => {
    setIsMenuPlaylist(true);
    setNamePlaylistToDisplay("New Playlist");
  };

  const handleAddTrack = (idSongToAdd) => {
    if (!isMenuPlaylist) {
      if (Object.keys(playlistToDisplay).includes(idSongToAdd)) {
        setMessage("This song is already present in the palylist");
        setTimeout(() => setMessage(""), 2000);
      } else {
        setPlaylistToDisplay((prev) => (
          {
            ...prev,
            [idSongToAdd]: ressources.trackList1[idSongToAdd]
          }
        ))
      };     
    };
  };

  const handleRemoveTrack = (e) => {
    const idSongToRemove = e.target.songId;
    delete playlists[namePlaylistToDisplay][idSongToRemove]; 
  };

  const handleInputSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    // tracklist = fetch 
  };

  return (
    <div className="App">
      <SearchField         
        search={search} 
        handleInputSearch={handleInputSearch} 
        handleSubmitSearch={handleSubmitSearch} />
      <p>{message}</p>
      <div className="container">
        <SearchResults 
          tracklistToDisplay={tracklistToDisplay} 
          handleAddTrack={handleAddTrack} />
        <PlaylistMenu 
          playlists={playlists} 
          isMenuPlaylist={isMenuPlaylist}
          playlistToDisplay={playlistToDisplay}
          namePlaylistToDisplay={namePlaylistToDisplay}
          keepPlaylistName={keepPlaylistName}
          handleNewName={handleNewName}
          handleAddPlaylist={handleAddPlaylist} 
          handlePlaylistClick={handlePlaylistClick}
          handleBackToMenu={handleBackToMenu}
          handleRemoveTrack={handleRemoveTrack} 
          handleAddTrack={handleAddTrack}
          handleSubitNamePlaylist={handleSubitNamePlaylist}
          handleModifPlaylistName={handleModifPlaylistName}
          />
        </div>          
    </div>
  );
};

export default App;
