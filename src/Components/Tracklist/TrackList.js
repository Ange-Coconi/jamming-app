import React, {useState} from "react";
import ressources from "../ressources/data.js"
import Track from "../Track/Track.js";
import {generateKeyNumber} from "../ressources/helperFunction.js"

function TrackList(props) {
    const searchResult = ressources.trackList1;


    return (
        <div>
            {Object.entries(searchResult).map(([songId, song]) => {
                return (
                <Track 
                key={`track-${generateKeyNumber()}`}
                songId={songId} 
                songName={song.name} 
                artist={song.artist} 
                album={song.album} 
                type="tracklist" 
                handleAddTrack={props.handleAddTrack} />
                )
            })}    
        </div>
    );
};

export default TrackList;
