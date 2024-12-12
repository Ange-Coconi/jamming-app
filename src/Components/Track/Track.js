import React from "react";

function Track(props) {

    return (
        <div>
            <h5>{props.songName}</h5>
            <h6>{props.artist}</h6>
            <h6>{props.album}</h6>
        </div>
    );
}

export default Track;