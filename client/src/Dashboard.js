import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import React, { useEffect, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-node';
import ContactForm from './ContactForm';
import Player from './Player';
import TrackArtists from './TrackArtists';
import TrackBrower from './TrackBrower';
import TrackSearchResult from './TrackSearchResult';
import TracksResult from './TracksResult';
import useAuth from './useAuth';
import UserPlaylist from './UserPlaylist';

const spotifyApi = new SpotifyWebApi({
    clientId: "2674b2672eaa4125bc9cbfeea42b45e1",
})
const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  }));
export default function Dashboard({code}) {
     const history= useHistory();
    const classes = useStyles();
    const accessToken = useAuth(code)
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [searchArtists, setSearchArtists] = useState("")
    const [searchResultsArtists, setSearchResultsArtists] = useState([])
    const [results, setResults] = useState([])
    const [show, setShow] = useState("")
    const [addtrack, setAddTrack] = useState("") 
    const [resultBrower, setResultBrower] = useState([])
    const [showBrower, setShowBrower] = useState("") 
    const [resultGetPlaylist, setResultGetPlaylist] = useState([])
    const [resulsPlaylist, setResultsPlaylist] = useState('214xxu5h5uberpl4b3cb5zavy')
    const [showCreatePlaylist, setShowCreatePlaylist] = useState('') 
    const [playingTrack, setPlayingTrack] = useState()
    const [playingTrack1, setPlayingTrack1] = useState()
    const [playingTrack2, setPlayingTrack2] = useState()
    const [playingTrack3, setPlayingTrack3] = useState()
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [idPlaylist, setIdPlaylist] = useState("")
    const [addTracktoPlaylist, setAddTracktoPlaylist] = useState("")
    console.log(addTracktoPlaylist)
    const handleSubmit = (values)=>{
      setShowCreatePlaylist(values)
    }
    useEffect(() => {
        if(!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    },[accessToken])

    useEffect(() => {
          if(!accessToken) return
          spotifyApi.createPlaylist(showCreatePlaylist).then(rescreate => {
            setResultsPlaylist(rescreate)     
          })
      },[showCreatePlaylist])

      useEffect(() => {
        if(!accessToken) return
        spotifyApi.addTracksToPlaylist(idPlaylist,[addTracktoPlaylist])
    },[idPlaylist,addTracktoPlaylist])
      
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const handleClickOpen1 = () => {
        setOpen1(true);
      };
    
      const handleClose1 = () => {
        setOpen1(false);
      };
      const handleClickOpen2 = () => {
        setOpen2(true);
      };
    
      const handleClose2 = () => {
        setOpen2(false);
      };
    function chooseTrack(track) {
        setPlayingTrack(track)
        setSearch("")
    }

    function chooseTracks(tracks) {
        setPlayingTrack(tracks)
        
    }
    function chooseTrackBrower(trackBrower) {
        setPlayingTrack1(trackBrower)
       
    }
    function chooseTrackArtists(trackArtists) {
      setPlayingTrack2(trackArtists)
     
  }
  function choosetrackPlaylist(userplaylist) {
    setPlayingTrack3(userplaylist)
  }
    // Get Playlist
    useEffect(() => {
      if(!accessToken) return
      spotifyApi.getUserPlaylists(resulsPlaylist).then(resPlaylist =>{
        setResultGetPlaylist(resPlaylist.body.items.map(myplaylist=>{
                  return {
                    name:myplaylist.name,
                    image:myplaylist.images[0]?.url,
                    uri:myplaylist.uri,
                    id:myplaylist.id,
                  }
                }))
        })
  },[resulsPlaylist, accessToken])
    // Artists
    useEffect(() => {
      if(!searchArtists) return setSearchResultsArtists([])
      if(!accessToken) return
     
      spotifyApi.searchArtists(searchArtists).then(resArtists =>{
          setSearchResultsArtists(resArtists.body.artists.items.map(artist =>{
                  return {
                    genres: artist?.genres[0],
                    img: artist.images[0]?.url,
                    title:artist.name,
                    uri: artist.uri,
              }
          }))
      })
  },[searchArtists, accessToken])


    // get release
    useEffect(() => {
        if(!accessToken) return
        spotifyApi.getNewReleases(showBrower).then(resbrowers =>{    
            setResultBrower(resbrowers.body.albums.items.map(trackbrower => {
                return {
                    image: trackbrower.images[0].url,
                    title: trackbrower.name,
                    artist: trackbrower.artists[0].name,
                    uri: trackbrower.uri,
                }
            }))
        })
    },[showBrower, accessToken])

    // get playlists
    useEffect(() => {
        if(!accessToken) return
        spotifyApi.getFeaturedPlaylists(show).then(res =>{
            setResults(res.body.playlists.items.map(tracks => {
                return {
                    image: tracks.images[0].url,
                    title: tracks.name,
                    description: tracks.description,
                    uri: tracks.uri,
                }
            }))
        })
    },[show, accessToken])

  // search
        useEffect(() => {
        if(!search) return setSearchResults([])
        if(!accessToken) return
        let cancel = false
        spotifyApi.searchTracks(search).then(res =>{
            if(cancel) return
            setSearchResults(res.body.tracks.items.map(track =>{
                const smallestAlbumImage = track.album.images.reduce((smallest, 
                    image) => {
                        if(image.height< smallest.height) return image
                        return smallest
                    }, track.album.images[0])
              
                    return {
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    albumUrl: smallestAlbumImage.url
                }
            }))
        })
        return () => cancel = true
    },[search, accessToken])
    return (
        <div>
        <Container className="d-flex flex-column py-2" style={{
            height:"100vh"}}>
             {resultBrower.map(trackBrower => (
                    <TrackBrower trackBrower={trackBrower} 
                    key={ trackBrower.uri} 
                    chooseTrackBrower={chooseTrackBrower}/>
                    ))} 
                <Player accessToken={accessToken} trackUri={playingTrack1?.uri} />
            <Button variant="contained" onClick={handleClickOpen1}>
                NewMusic
            </Button>
            <Button variant="contained" onClick={handleClickOpen}>
                Search Music
            </Button>
            <Button variant="contained" onClick={handleClickOpen2}>
                 Playlist
            </Button>
        </Container>
        <div>
      <Dialog fullScreen open={open1} onClose={handleClose1}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose1} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Music
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          {results.map(tracks => (
                    <TracksResult tracks={tracks} 
                    key={tracks.uri} 
                    chooseTracks={chooseTracks}/>
                    ))} 
                    <div className="text-center" style={{ whiteSpace: 'pre'}}>
                   
                    </div>
            <div>
                <Player accessToken={accessToken} trackUri={playingTrack2?.uri} />
            </div>
        </List>
      </Dialog>  
      
      {/* search */}

      <Dialog fullScreen open={open} onClose={handleClose}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              search
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
        <Form.Control type="search" placeholder="search song"
            value={search} 
            onChange={e => setSearch(e.target.value)}
            />
          {searchResults.map(track => (
                  <TrackSearchResult track={track} 
                  key={track.uri} 
                  chooseTrack={chooseTrack} />
              ))}
                <Form.Control type="search" placeholder="search Artists"
            value={searchArtists} 
            onChange={e => setSearchArtists(e.target.value)}
            />
                {searchResultsArtists.map(trackArtists => (
                    <TrackArtists trackArtists={trackArtists} 
                    key={trackArtists.uri} 
                    chooseTrackArtists={chooseTrackArtists} />
              ))}
            <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
        </List>
      </Dialog>
      <Dialog fullScreen open={open2} onClose={handleClose2}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose2} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Playlist
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          <ContactForm onSubmit={handleSubmit}/>
          <div> 
          {resultGetPlaylist.map(userplaylist => (
            <div key={userplaylist.id} onClick={()=> setIdPlaylist(userplaylist.id)}>
              <UserPlaylist  userplaylist={userplaylist}
              key={userplaylist.uri}
              choosetrackPlaylist={choosetrackPlaylist}/>
            </div>
            ))}
             <Form.Control type="search" placeholder="search song"
            value={search} 
            onChange={e => setSearch(e.target.value)}
            />
          {searchResults.map(track => (
            <div key={track.id} onClick={()=> setAddTracktoPlaylist(track.uri)}>
                  <TrackSearchResult track={track} 
                  key={track.uri} 
                  chooseTrack={chooseTrack} />
              </div>
              ))}
          
            <Player accessToken={accessToken} trackUri={playingTrack3?.uri} />
          </div>
        </List>
      </Dialog>
        </div>
        </div>
    )
}
