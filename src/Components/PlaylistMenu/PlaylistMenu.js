import React from "react";
import Playlist from "../Playlist/Playlist.js";
import styles from "./PlaylistMenu.module.css"

function PlaylistMenu(props) {

    return (
        <div className="PlaylistMenu">
          {props.isMenuPlaylist ? (
              <div className={styles.displayPlaylists}>
                <div className={styles.addNewPlaylist}>
                  <button type={styles.button} onClick={props.handleAddPlaylist}>Add a new playlist !</button>
                </div>
                <p>{Object.keys(props.playlists).length}</p>
                <div className={styles.playlists}>
                  {Object.entries(props.playlists).map(([namePlaylist, playlist]) => {
                    return (<h2 onClick={props.handlePlaylistClick} className={namePlaylist}>{namePlaylist}</h2>);
                  })}
                </div>
              </div>        
            ) : 
              <div className="displayPlaylistContainer">
                <div>
                  <button type="button" onClick={props.handleBackToMenu} >Back to playlists menu</button>
                </div>
                <p>{Object.keys(props.playlists).length}</p>
                <Playlist 
                  playlistToDisplay={props.playlistToDisplay} 
                  namePlaylistToDisplay={props.namePlaylistToDisplay}
                  handleNewName={props.handleNewName}
                  handleRemoveTrack={props.handleRemoveTrack}
                  keepPlaylistName={props.keepPlaylistName}
                  handleModifPlaylistName={props.handleModifPlaylistName}
                  handleSubitNamePlaylist={props.handleSubitNamePlaylist}
                  handleDeletePlaylist={props.handleDeletePlaylist} />
              </div>
            }
        </div>
        )
};

export default PlaylistMenu;