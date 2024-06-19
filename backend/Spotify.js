const express = require('express');
const axios = require('axios');
const querystring = require('querystring');

const router = express.Router();

const client_id = '26097a2bb2cf4187a7d4b449981173ff';
const client_secret = '970d219fa6284d7f9cd52f9ed9e853a2';
const redirect_uri = 'http://localhost:3001/callback';

router.get('/spotify', (req, res) => {
    const scope = 'playlist-read-private';
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
        }));
});

router.get('/callback', async (req, res) => {
    const code = req.query.code || null;
    const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
    }), {
        headers: {
            'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    const access_token = tokenResponse.data.access_token;
    res.redirect('/profile?' + querystring.stringify({
        access_token: access_token
    }));
});

router.get('/profile', async (req, res) => {
    const access_token = req.query.access_token;
    const profileResponse = await axios.get('https://api.spotify.com/v1/me', {
        headers: {
            'Authorization': 'Bearer ' + access_token
        }
    });

    const playlistsResponse = await axios.get('https://api.spotify.com/v1/me/playlists', {
        headers: {
            'Authorization': 'Bearer ' + access_token
        }
    });

    res.send(playlistsResponse.data);
});

export default router;
