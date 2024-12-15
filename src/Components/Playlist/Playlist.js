import React, {useState} from "react";
import Track from "../Track/Track.js";
import SaveToSpotifyButton from "../SaveToSpotifyButton/SaveToSpotifyButton.js";
import styles from "./Playlist.module.css"
import {generateKeyNumber} from "../ressources/helperFunction.js"

function Playlist(props) {

    return (
        <div className={styles.Playlist}>
            <div className={styles.BackToMenuButtonAndDelete}>
                <button type="button" onClick={props.handleSaveToSpotify}>Save to Spotify</button>
                <button type="button" onClick={props.handleDeletePlaylist}>delete</button>
                <button type="button" onClick={props.handleBackToMenu} >Back to playlists menu</button>
            </div>
            { props.keepPlaylistName ? 
                <div className={styles.title}>
                    <h2>{props.namePlaylistToDisplay}</h2>
                    <button onClick={props.handleModifPlaylistName}>modify playlist's name</button>
                    <p>Number of song : {Object.keys(props.playlistToDisplay).length}</p>
                </div> : 
                <form onSubmit={props.handleSubitNamePlaylist}>
                    <input onChange={props.handleNewName} type="text" value={props.namePlaylistToDisplay}/>
                    <button type="submit">ok</button>
                </form>   
            }  
            {Object.entries(props.playlistToDisplay).map(([songId, song]) => {
                return (
                    <Track 
                        key={`track-${generateKeyNumber()}`}
                        songId={songId} 
                        songName={song.name} 
                        artist={song.artist} 
                        album={song.album} 
                        type="playlist" 
                        handleRemoveTrack={props.handleRemoveTrack} 
                    />
                    )
            })}
            <SaveToSpotifyButton />               
        </div>
    );
};

export default Playlist;
