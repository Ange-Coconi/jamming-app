import './App.css';
import React, {useState, useEffect} from 'react';
import SearchResults from './Components/SearchResults/SearchResults.js';
import PlaylistMenu from './Components/PlaylistMenu/PlaylistMenu.js';
import SearchField from './Components/SearchField/SearchField.js';
import ressources from "./Components/ressources/data.js";
import { useAuth, AuthProvider } from './Modules/AuthService.js';
import { searchTracksByArtist } from './Modules/requestAPI.js';


function AppContent() {
  const [search, setSearch] = useState(""); // String corresponding of the input of the user for the search.
  const [tracklistToDisplay, setTracklistToDisplay] = useState(); 
  const [isMenuPlaylist, setIsMenuPlaylist] = useState(true); // Boolean to determine if the playlist menu is display or not;
  const [playlists, setPlaylists] = useState({}); // Object of "playlist object", which contain two keys ==> name: string, songs: array. The Array of songs contain "song object".
  const [playlistToDisplay, setPlaylistToDisplay] = useState({}); // The playlist to display, this variable contain an object ==> name + songs.
  const [namePlaylistToDisplay, setNamePlaylistToDisplay] = useState("New Playlist"); // Name of the playlist to display.
  const [keepPlaylistName, setKeepPlaylistName] = useState(true)
  const [message, setMessage] = useState("")
  const [isPlaylistUpdatePending, setIsPlaylistUpdatePending] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const { isAuthenticated } = useAuth();
 
  useEffect(() => {
    if (isPlaylistUpdatePending && namePlaylistToDisplay) {
      setPlaylists(prevPlaylists => {
        const { [namePlaylistToDisplay]: _, ...newPlaylists } = prevPlaylists;
        return newPlaylists;
      });
      setIsPlaylistUpdatePending(false);
    }
  }, [namePlaylistToDisplay, isPlaylistUpdatePending]);

  const handleNewName = (e) => {
    setNamePlaylistToDisplay(e.target.value);
  };

  const handleModifPlaylistName = () => {
    setKeepPlaylistName(false);
  };

  const handleSubitNamePlaylist = () => {
    setKeepPlaylistName(true);
  };

  const handleAddPlaylist = () => {
    setIsMenuPlaylist(false);
    setPlaylistToDisplay({})
    setNamePlaylistToDisplay("New Playlist");
  };

  const handleDeletePlaylist = () => {
    setIsMenuPlaylist(true);
  }

  const handlePlaylistClick = async (e) => {
    let playlistName = e.target.className.split(' ').slice(1).join(' ');
    setNamePlaylistToDisplay(playlistName);
    setIsPlaylistUpdatePending(true);
    setPlaylistToDisplay(playlists[playlistName]);
    setIsMenuPlaylist(false);
  };

  const handleBackToMenu = () => {
    setIsMenuPlaylist(true);
    if (Object.keys(playlists).includes(namePlaylistToDisplay)) {
      let number = 1;
      let newName = namePlaylistToDisplay;
      while (Object.keys(playlists).includes(newName)) {
        newName = `${namePlaylistToDisplay} (${number})`;
        number++;
      };
      setNamePlaylistToDisplay(newName);
      setPlaylists((prev) => (
        {
          ...prev,
          [newName]: playlistToDisplay
        }
      ));
    } else {
      setPlaylists((prev) => (
        {
          ...prev,
          [namePlaylistToDisplay]: playlistToDisplay
        }
      ));
    };
  };

  const handleAddTrack = (idSongToAdd) => {
    if (!isMenuPlaylist) {
      if (Object.keys(playlistToDisplay).includes(idSongToAdd)) {
        setMessage("This song is already present in the palylist");
        setShowMessage(true);
        setTimeout(() => {
          setMessage("")
          setShowMessage(false)
        }
        , 2000);
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

  const handleRemoveTrack = (idSongToRemove) => {
    setPlaylistToDisplay(prev => {
      const { [idSongToRemove]: _, ...updatedPlaylist } = prev;
      return updatedPlaylist;
    });
  };

  const handleInputSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmitSearch = async (e) => {
    e.preventDefault();
    alert(search);
    try {
      let tracks = searchTracksByArtist(search);
      setTracklistToDisplay(tracks);
    } catch (error) {
      console.error(error.message);
    }
  };

  if (!isAuthenticated) {
    return <div>Authenticating...</div>;
  }

  return (
    <div className="App">
      <SearchField         
        search={search} 
        handleInputSearch={handleInputSearch} 
        handleSubmitSearch={handleSubmitSearch} />
      <div className="message">
        <h5 style={showMessage ? {backgroundColor: "rgba(40, 3, 99, 0.7)"} : {}}>{message}</h5>
        <p>Tu ne me vois pas!</p>
      </div>
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
          handleDeletePlaylist={handleDeletePlaylist}
          />
        </div>          
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
