import React from "react";
import Playlist from "../Playlist/Playlist.js";

function PlaylistMenu(props) {

    return (
        <div className="PlaylistMenu">
          {props.isMenuPlaylist ? (
              <div>
                {Object.entries(props.playlists).map(([namePlaylist, playlist]) => {
                  <h2 onClick={props.handlePlaylistClick} className={namePlaylist}>{namePlaylist}</h2>
                })}
                <button type="button" onClick={props.handleAddPlaylist}>Add a new playlist !</button>
              </div>        
            ) : 
              <div className="displayPlaylistContainer">
                <div>
                  <button type="button" onClick={props.handleBackToMenu} >Back to playlists menu</button>
                </div>
                <Playlist 
                  playlistToDisplay={props.playlistToDisplay} 
                  namePlaylistToDisplay={props.namePlaylistToDisplay}
                  handleNewName={props.handleNewName}
                  handleRemoveTrack={props.handleRemoveTrack}
                  keepPlaylistName={props.keepPlaylistName}
                  handleModifPlaylistName={props.handleModifPlaylistName}
                  handleSubitNamePlaylist={props.handleSubitNamePlaylist} />
              </div>
            }
        </div>
        )
};

export default PlaylistMenu;