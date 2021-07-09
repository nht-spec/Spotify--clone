import React, { useEffect, useState } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback';
export default function Player({accessToken, trackUri})
{
    const [play, setPlay] = useState(false)
    useEffect(() => setPlay(true), [trackUri])
    if(!accessToken) return null
    return <SpotifyPlayer
    // styles={{
    //     activeColor: '#fff',
    // bgColor: '#333',
    // color: '#fff',
    // loaderColor: '#fff',
    // sliderColor: '#1cb954',
    // trackArtistColor: '#ccc',
    // trackNameColor: '#fff',
    // }}
    token={accessToken}
    callback={state => {
        if(!state.isPlaying) setPlay(false)
    }}
    showSaveIcon
    autoPlay
    persistDeviceSelection
    volume
    play={play}
    uris={trackUri ? [trackUri] : []}
    />
}
