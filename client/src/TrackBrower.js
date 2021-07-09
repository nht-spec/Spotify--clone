import React from 'react';

export default function TrackBrower({trackBrower, chooseTrackBrower}) {
    function handlePlayBrower() {
        chooseTrackBrower( trackBrower, chooseTrackBrower)
    }
    return (
        <div className="d-flex m-2 align-items-center"
         style={{cursor: 'pointer'}}
         onClick={handlePlayBrower}
       >
            <img src={trackBrower.image} style={{width:'64px', height:'64px'}} />
            <div className="ml-3">
            <div>{trackBrower.title}</div>
            <div>{trackBrower.artist}</div>
     
            </div>            
        </div>
    )
}
