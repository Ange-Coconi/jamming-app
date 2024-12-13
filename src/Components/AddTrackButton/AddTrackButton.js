import React from "react";
import styles from '../Track/Track.module.css';

function AddTrackButton(props) {
    return (
        <div className={styles.AddTrackButton}>
            <button onClick={() => props.handleAddTrack(props.songId)} >+</button>
        </div>
    )
};

export default AddTrackButton;