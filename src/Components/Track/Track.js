import React from "react";
import AddTrackButton from "../AddTrackButton/AddTrackButton.js";
import RemoveTrackButton from "../RemoveTrackButton/RemoveTrackButton.js";

function Track(props) {

    return (
        <div>
            <h5>{props.songName}</h5>
            <h6>{props.artist}</h6>
            <h6>{props.album}</h6>
            {props.type === "playlist" ? 
            <RemoveTrackButton /> : 
            <AddTrackButton />
            }
        </div>
    );
}

export default Track;