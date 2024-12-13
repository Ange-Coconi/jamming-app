import React from "react";
import Playlist from "../Playlist/Playlist.js";

function PlaylistMenu(props) {

    return (
        <>
        {props.isMenuPlaylist ? (
            <div>
              {Object.entries(props.playlists).map(([namePlaylist, playlist]) => {
                <h2 onClick={props.handlePlaylistClick} className={namePlaylist}>{namePlaylist}</h2>
              })}
              <button type="button" onClick={props.handleAddPlaylist}>Add a new playlist !</button>
            </div>        
          ) : 
            <div>
              <button type="button" onClick={props.handleBackToMenu} >Back to playlists menu</button>
              <Playlist 
                playlistToDisplay={props.playlistToDisplay} 
                namePlaylistToDisplay={props.namePlaylistToDisplay}
                handleNewName={props.handleNewName}
                handleRemoveTrack={props.handleRemoveTrack} />
            </div>
          }
        </>
        )
};

export default PlaylistMenu;