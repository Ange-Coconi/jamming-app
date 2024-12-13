import React, {useState} from "react";
import ressources from "../ressources/data.js"
import Track from "../Track/Track.js";
import {generateKeyNumber} from "../ressources/helperFunction.js"

function TrackList(props) {
    const [searchResult, setSearchResult] = useState(ressources.trackList1);

    return (
        <div>
            {searchResult.map(song => {
                return (
                <Track 
                key={`track-${generateKeyNumber()}`} 
                song={song}
                songId={song.id}
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