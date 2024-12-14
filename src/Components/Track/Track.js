import React from "react";
import AddTrackButton from "../AddTrackButton/AddTrackButton.js";
import RemoveTrackButton from "../RemoveTrackButton/RemoveTrackButton.js";
import styles from './Track.module.css';

function Track(props) {

    return (
        <div className={styles.Track}>
            <h5 className={styles.songName}>{props.songName}</h5>
            <h6 className={styles.artist}>{props.artist}</h6>
            <h6 className={styles.album}>{props.album}</h6>
            {props.type === "playlist" ? 
            <RemoveTrackButton 
                handleRemoveTrack={props.handleRemoveTrack} 
                songId={props.songId} /> : 
            <AddTrackButton
                handleAddTrack={props.handleAddTrack} 
                songId={props.songId}/>
            }
        </div>
    );
}

export default Track;