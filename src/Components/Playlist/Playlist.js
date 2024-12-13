import React, {useState} from "react";
import ressources from "../ressources/data.js"
import Track from "../Track/Track.js";

import {generateKeyNumber} from "../ressources/helperFunction.js"

function Playlist(props) {
    const [name, setName] = useState(props.playlistToDisplay.name)

    const handleNewName = (e) => {
        setName(e.target.value)
    }

    return (
        <div>
            { name ? 
                <h2>{name}</h2> : 
                <input onChange={handleNewName} type="text" value={name}/>    
            }
            
            <p>Number of song : {props.playlistToDisplay.song.length}</p>
            {props.playlistToDisplay.song.map(song => {
                return (
                    <Track 
                        key={`track-${generateKeyNumber()}`} 
                        songName={song.name} 
                        artist={song.artist} 
                        album={song.album} 
                        type="playlist" />
                    )
            })}               
        </div>
    );
};

export default Playlist;
