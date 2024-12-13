import './App.css';
import React, {useState} from 'react';
import SearchResults from './Components/SearchResults/SearchResults.js';
import PlaylistMenu from './Components/PlaylistMenu/PlaylistMenu.js';
import SearchField from './Components/SearchField/SearchField.js';


function App() {
  const [playlists, setPlaylists] = useState([]);
  const [isMenuPlaylist, setIsMenuPlaylist] = useState(true);
  const [playlistToDisplay, setPlaylistToDisplay] = useState();
  const [search, setSearch] = useState("");
  const [tracklistToDisplay, setTracklistToDisplay] = useState();

  const handleAddPlaylist = (e) => {
    setIsMenuPlaylist(false);
    setPlaylists(prev => prev.push({
      name: "",
      songs: []
    }));
    setPlaylistToDisplay(playlists[playlists.length - 1])
  }

  const handlePlaylistClick = (e) => {
    const playlistName = e.target.className;
    let indexPlaylist = 0;
    for (let i = 0; indexPlaylist < playlists.length; i++) {
      if (playlists[indexPlaylist].name === playlistName) {
        indexPlaylist = i;
        break
      };
    };
    setPlaylistToDisplay(playlists[indexPlaylist]);
    setIsMenuPlaylist(false);
  };

  const handleBackToMenu = () => {
    setIsMenuPlaylist(true);
  }

  const handleAddTrack = (e) => {

  }

  const handleRemoveTrack = (e) => {
    playlists
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
      <SearchResults 
        tracklistToDisplay={tracklistToDisplay} />
      <PlaylistMenu 
        playlists={playlists} 
        isMenuPlaylist={isMenuPlaylist}
        playlistToDisplay={playlistToDisplay}
        handleAddPlaylist={handleAddPlaylist} 
        handlePlaylistClick={handlePlaylistClick}
        handleBackToMenu={handleBackToMenu} />          
    </div>
  );
}

export default App;
