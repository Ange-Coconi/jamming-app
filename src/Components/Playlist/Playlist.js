import React, {useState} from "react";
import Track from "../Track/Track.js";
import SaveToSpotifyButton from "../SaveToSpotifyButton/SaveToSpotifyButton.js";

import {generateKeyNumber} from "../ressources/helperFunction.js"

function Playlist(props) {

    return (
        <div>
            { props.namePlaylistToDisplay ? 
                <h2>{props.namePlaylistToDisplay}</h2> : 
                <input onChange={props.handleNewName} type="text" value={props.namePlaylistToDisplay}/>    
            }  
            <p>Number of song : {props.playlistToDisplay.song.length}</p>
            {props.playlistToDisplay.song.map(song => {
                return (
                    <Track 
                        key={`track-${generateKeyNumber()}`}
                        songId={song.id} 
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
