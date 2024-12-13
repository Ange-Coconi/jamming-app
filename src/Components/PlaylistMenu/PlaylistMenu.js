import React from "react";
import Playlist from "../Playlist/Playlist.js";

function PlaylistMenu(props) {

    return (
        <>
        {props.isMenuPlaylist ? (
            <div>
              {props.playlists.map(playlist => {
                <h2 onClick={props.handlePlaylistClick} className={playlist.name}>{playlist.name}</h2>
              })}
              <button type="button" onClick={props.handleAddPlaylist}>Add a new playlist !</button>
            </div>        
          ) : 
            <div>
              <button type="button" onClick={props.handleBackToMenu} >Back to playlists menu</button>
              <Playlist playlistToDisplay={props.playlistToDisplay} />
            </div>
          }
        </>
        )
};

export default PlaylistMenu;