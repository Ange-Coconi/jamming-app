import React, {useState} from "react";
import {trackList1, trackList2} from "../ressources/data"
import Track from "../Track/Track";

console.log(trackList1[0].name);

// function TrackList() {
//     const [searchResult, setSearchResult] = useState(trackList1);

//     return (
//         <div>
//             {searchResult.map(song => {
//                 return <Track songName={song.name}/>
//             })}    
//         </div>
//     );
// };