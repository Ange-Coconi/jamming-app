import './App.css';
import React, {useState} from 'react';
import SearchResults from './Components/SearchResults/SearchResults.js';
import PlaylistMenu from './Components/PlaylistMenu/PlaylistMenu.js';
import SearchField from './Components/SearchField/SearchField.js';


function App() {
  const [search, setSearch] = useState(""); // String corresponding of the input of the user for the search.
  const [tracklistToDisplay, setTracklistToDisplay] = useState(); 
  const [isMenuPlaylist, setIsMenuPlaylist] = useState(true); // Boolean to determine if the playlist menu is display or not;
  const [playlists, setPlaylists] = useState([]); // List of "playlist object", which contain two keys ==> name: string, songs: array. The Array of songs contain "song object".
  const [playlistToDisplay, setPlaylistToDisplay] = useState(); // The playlist to display, this variable contain an object ==> name + songs.
  const [namePlaylistToDisplay, setNamePlaylistToDisplay] = useState(""); // Name of the playlist to display.
  const [message, setMessage] = useState("")

  let indexPlaylist;
  
  const handleNewName = (e) => {
    setNamePlaylistToDisplay(e.target.value)
  }

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
    indexPlaylist = 0;
    for (let i = 0; indexPlaylist < playlists.length; i++) {
      if (playlists[indexPlaylist].name === playlistName) {
        indexPlaylist = i;
        break
      };
    };
    setPlaylistToDisplay(playlists[indexPlaylist]);
    setNamePlaylistToDisplay(playlistName);
    setIsMenuPlaylist(false);
  };

  const handleBackToMenu = () => {
    setIsMenuPlaylist(true);
    setNamePlaylistToDisplay("");
  }

  const handleAddTrack = (e) => {
    const parentDiv = e.targetclosest('div');
    const songToAdd = e.target.song
    if (!isMenuPlaylist) {
      if (playlists[indexPlaylist].songs.include(songToAdd)) {
        setMessage("This song is already present in the palylist");
        setTimeout(() => setMessage(""), 4000);
      } else {
        playlists[indexPlaylist].songs.push(songToAdd);
      }     
    }
  }

  const handleRemoveTrack = (e) => {
    // playlists

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
        />          
    </div>
  );
}

export default App;
