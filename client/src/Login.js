import React from 'react';
import { Container } from 'react-bootstrap';
const AUTH_URL = " https://accounts.spotify.com/authorize?client_id=2674b2672eaa4125bc9cbfeea42b45e1&response_type=code&redirect_uri=https://spotify-clone-blue.vercel.app&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-modify-public%20playlist-modify-private%20playlist-read-private%20playlist-read-collaborative"
export default function Login() {
    return <Container>
        <a className="btn btn-success btn-lg" href={AUTH_URL}>
            Login with Spotify
        </a>
      
    </Container>
}
