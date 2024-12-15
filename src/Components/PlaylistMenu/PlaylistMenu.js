import React from "react";
import Playlist from "../Playlist/Playlist.js";
import styles from "./PlaylistMenu.module.css";
import { v4 as uuidv4 } from 'uuid';

function PlaylistMenu(props) {

    return (
        <div className="PlaylistMenu">
          {props.isMenuPlaylist ? (
              <div className={styles.displayPlaylists}>
                <div className={styles.addNewPlaylist}>
                  <h6 className={styles.button} onClick={props.handleAddPlaylist}>Add a new playlist !</h6>
                </div>
                <div className={styles.playlists}>
                  {Object.entries(props.playlists).map(([namePlaylist, playlist]) => {
                    return (<h2 key={uuidv4()} onClick={props.handlePlaylistClick} className={`${styles.playlistItem} ${namePlaylist}`}>{namePlaylist}</h2>);
                  })}
                </div>
              </div>        
            ) : 
              <div className={styles.displayPlaylistContainer}>
                <Playlist 
                  playlistToDisplay={props.playlistToDisplay} 
                  namePlaylistToDisplay={props.namePlaylistToDisplay}
                  handleNewName={props.handleNewName}
                  handleRemoveTrack={props.handleRemoveTrack}
                  keepPlaylistName={props.keepPlaylistName}
                  handleModifPlaylistName={props.handleModifPlaylistName}
                  handleSubitNamePlaylist={props.handleSubitNamePlaylist}
                  handleDeletePlaylist={props.handleDeletePlaylist}
                  handleBackToMenu={props.handleBackToMenu}
                  handleSaveToSpotify={props.handleSaveToSpotify} />
              </div>
            }
        </div>
        )
};

export default PlaylistMenu;