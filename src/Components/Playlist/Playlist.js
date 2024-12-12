import React, {useState} from "react";
import ressources from "../ressources/data.js"
import Track from "../Track/Track.js";

import {generateKeyNumber} from "../ressources/helperFunction.js"

function Playlist(props) {
    const playlists = props.playlists;

    return (
        <div>
            <h2>Number of playlist : {playlists.length}</h2>
            {playlists.map(song => {
                return <Track key={`track-${generateKeyNumber()}`} songName={song.name} artist={song.artist} album={song.album} />
            })}
                
        </div>
    );
};

export default Playlist;
