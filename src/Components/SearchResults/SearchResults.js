import React from "react";
import TrackList from "../TrackList/TrackList.js";

function SearchResults(props) {

    return (
        <div className="SearchResults">
            <h2>Results</h2>
            <TrackList 
                tracklistToDisplay={props.tracklistToDisplay} 
                handleAddTrack={props.handleAddTrack} />
        </div>
    );
};

export default SearchResults;