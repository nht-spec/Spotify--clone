import React from 'react';

export default function TrackArtists({trackArtists, chooseTrackArtists}) {
    function handlePlayArtists() {
        chooseTrackArtists(trackArtists,chooseTrackArtists)
    }
    return (
        <div className="d-flex m-2 align-items-center"
         style={{cursor: 'pointer'}}
         onClick={handlePlayArtists}
       >
          <img src={trackArtists.img} style={{height:"64px", with: "64px"}} />
            <div className="ml-3">
            <div>{trackArtists.genres}</div>
            <div>{trackArtists.title}</div>
            </div>            
        </div>
    )
}
