import React from "react";

function AddPlaylistButton(props) {

    const handleClick = (e) => {
        props.addPlaylist()
    };

    return (
        <button type="button" onClick={handleClick}>Add a new playlist !</button>
    );
}

export default AddPlaylistButton;