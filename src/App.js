import './App.css';
import React, {useState, useEffect} from 'react';
import SearchResults from './Components/SearchResults/SearchResults.js';
import PlaylistMenu from './Components/PlaylistMenu/PlaylistMenu.js';
import SearchField from './Components/SearchField/SearchField.js';
import { useAuth, AuthProvider } from './Modules/AuthService.js';
import { fetchTopTracks, searchArtistByName, addPlaylistToUser } from './Modules/requestAPI.js';


function AppContent() {
  const [search, setSearch] = useState(""); // String corresponding of the input of the user for the search.
  const [tracklistToDisplay, setTracklistToDisplay] = useState({}); 
  const [isMenuPlaylist, setIsMenuPlaylist] = useState(true); // Boolean to determine if the playlist menu is display or not;
  const [playlists, setPlaylists] = useState({}); // Object of "playlist object", which contain two keys ==> name: string, songs: array. The Array of songs contain "song object".
  const [playlistToDisplay, setPlaylistToDisplay] = useState({}); // The playlist to display, this variable contain an object ==> name + songs.
  const [namePlaylistToDisplay, setNamePlaylistToDisplay] = useState("New Playlist"); // Name of the playlist to display.
  const [keepPlaylistName, setKeepPlaylistName] = useState(true)
  const [message, setMessage] = useState("")
  const [isPlaylistUpdatePending, setIsPlaylistUpdatePending] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const { isAuthenticated, login, handleCallback, accessToken } = useAuth();

  useEffect(() => {
    // Check if there's a code in the URL (callback from Spotify)
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (!isAuthenticated) {
      if (code) {
        console.log('handleCallBack')
        // If there's a code, handle the callback
        handleCallback();
      } else {
        console.log('login')
        // If no code and not authenticated, initiate login
        login();
      }
    }
  // eslint-disable-next-line
  }, [isAuthenticated]);

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
            [idSongToAdd]: tracklistToDisplay[idSongToAdd]
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
    try {
      const tracks = {}
      const tracksFetched = await searchArtistByName(search, accessToken)
      .then(artistId => fetchTopTracks(artistId, accessToken))
      .catch(error => console.error(error.message));
      for (let i = 0; i < 8; i++) {
        const trackFetched = tracksFetched[i];
        tracks[trackFetched.id] = {
          name: trackFetched.name,
          artist: trackFetched.artists[0].name,
          album: trackFetched.album.name
        };
      };
      // tracksFetched.forEach(trackFetched => {
      //   tracks[trackFetched.id] = {
      //     name: trackFetched.name,
      //     artist: trackFetched.artists[0].name,
      //     album: trackFetched.album.name
      //   };
      // })
      setTracklistToDisplay(tracks);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSaveToSpotify = async () => {
    const ids = Object.keys(playlistToDisplay).join(',');
    const arrayOfMusicId = Object.keys(playlistToDisplay);
    let message;
    try {
      message = await addPlaylistToUser(arrayOfMusicId, ids, accessToken);
    } catch(err) {
      console.error(err);
    }
    setMessage(message);
    setShowMessage(true);
    setTimeout(() => {
        setMessage("")
        setShowMessage(false);
    });
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
          handleSaveToSpotify={handleSaveToSpotify}
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
