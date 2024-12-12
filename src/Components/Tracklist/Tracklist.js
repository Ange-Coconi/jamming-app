import React, {useState} from "react";
import ressources from "../ressources/data.js"
import Track from "../Track/Track.js";
import {generateKeyNumber} from "../ressources/helperFunction.js"

function TrackList() {
    const [searchResult, setSearchResult] = useState(ressources.trackList1);

    return (
        <div>
            {searchResult.map(song => {
                return <Track key={`track-${generateKeyNumber()}`} songName={song.name} artist={song.artist} album={song.album} />
            })}    
        </div>
    );
};

export default TrackList;