import React from 'react';

export default function UserPlaylist({userplaylist, choosetrackPlaylist}) {
    function handleUserplaylist() {
       choosetrackPlaylist(userplaylist,choosetrackPlaylist)
    }
    return (
        <div className="d-flex m-2 align-items-center"
        style={{cursor: 'pointer'}}
        onClick={handleUserplaylist}
      >
          <img src={userplaylist.image} style={{height:"100px", with: "109px"}} />
            <div className="ml-3">
            <div>{userplaylist.name}</div>
            
            </div>            
        </div>
    )
}
