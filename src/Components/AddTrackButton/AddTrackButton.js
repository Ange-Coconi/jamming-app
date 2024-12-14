import React from "react";
import styles from '../Track/Track.module.css';
import styles2 from './AddTrackButton.module.css';

function AddTrackButton(props) {
    return (
        <div className={`${styles.AddTrackButton} ${styles2.AddTrackButton}`}>
            <button onClick={() => props.handleAddTrack(props.songId)} >+</button>
        </div>
    )
};

export default AddTrackButton;