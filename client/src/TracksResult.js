import React from 'react'

export default function TracksResult({tracks, chooseTracks}) {
    function handlePlays() {
        chooseTracks(tracks);
    }
    return (
        <div className="d-flex m-2 align-items-center"
         style={{cursor: 'pointer'}}
         onClick={handlePlays}
       >
            <img src={tracks.image} style={{width:'64px', height:'64px'}} />
            <div className="ml-3">
            <div>{tracks.title}</div>
            <div>{tracks.description}</div>
            </div>            
        </div>
    )
}
