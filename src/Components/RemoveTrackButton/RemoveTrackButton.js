import React from "react";
import styles from '../Track/Track.module.css';
import styles2 from './RemoveTrackButton.module.css'

function RemoveTrackButton(props) {
    return (
        <div className={`${styles.RemoveTrackButton} ${styles2.RemoveTrackButton}`}>
            <button onClick={() => props.handleRemoveTrack(props.songId)}>-</button>
        </div>
    )
};

export default RemoveTrackButton;