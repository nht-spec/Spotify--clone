require('dotenv').config();
const express =require('express');
const cors = require('cors');
const spotifyWebApi = require('spotify-web-api-node');
const bodyParser = require('body-parser');
const lyricsFinder =require('lyrics-finder')
const app = express()
const port = process.env.PORT || 3001
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken
    const spotifyApi = new spotifyWebApi({
        redirectUri: process.env.REDIRECT_URI,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken
    })

    spotifyApi.refreshAccessToken().then(
         (data) => {
          res.json({
              accessToken: data.body.accessToken,
              expiresIn: data.body.expiresIn,
          })
          spotifyApi.setAccessToken(data.body['access_token']);
        }).catch(() => {
            res.sendStatus(400)
        })
})
app.post('/login',(req, res) => {
    const code = req.body.code;
    const spotifyApi = new spotifyWebApi({
        redirectUri: process.env.REDIRECT_URI,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
    })

    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in,
        })
    }).catch(() => {
        res.sendStatus(400)
    })
})
app.get('/lyrics', async (req, res) => {
    const lyrics = 
    await lyricsFinder(req.query.artist, req.query.track) || "No lyrics found"
    res.json({ lyrics })
})
app.listen(port)
