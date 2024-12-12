import './App.css';
import React, {useState} from 'react';
import TrackList from './Components/TrackList/TrackList.js';
import Playlist from './Components/Playlist/Playlist.js';
import AddPlaylistButton from "./Components/AddPlaylistButton/AddPlaylistButton.js";


function App() {
  const [playlists, setPlaylists] = useState([]);
  const [isMenuPlaylist, setIsMenuPlaylist] = useState(true);

  const addPlaylist = (name) => {
    setPlaylists(prev => prev.push({
      name: name,
      songs: []
    }));
  };

  const handlePlaylistClick = () => {
    setIsMenuPlaylist(false);
  };

  const handleBackToMenu = () => {
    setIsMenuPlaylist(false);
  }

  return (
    <div className="App">
      <TrackList />
      <AddPlaylistButton 
        disabled={isMenuPlaylist}
        addPlaylist={addPlaylist}/>
      {isMenuPlaylist ? (
        <div>
        {playlists.map(playlist => {
          <h2>{playlist.name}</h2>
        })}
      </div>
      ) : <Playlist onClick={handlePlaylistClick} playlists={playlists} />
      }    
      
    </div>
  );
}

export default App;
