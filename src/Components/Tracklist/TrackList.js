import Track from "../Track/Track.js";
import {generateKeyNumber} from "../ressources/helperFunction.js"

function TrackList(props) {
    return (
        <div>
            {Object.entries(props.tracklistToDisplay).map(([songId, song]) => {
                return (
                <Track 
                key={`track-${generateKeyNumber()}`}
                songId={songId} 
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
