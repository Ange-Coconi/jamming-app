import React from "react";

function AddTrackButton(props) {
    return (
        <button onClick={props.handleAddTrack} songId={props.songId} >+</button>
    )
};

export default AddTrackButton;