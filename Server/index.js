const express = require('express');
const bodyParser = require('body-parser');
const { default: Axios } = require('axios');

const PORT = '5001';
const SPOTIFY_CLIENT_ID = 'your spotify client id';
const SPOTIFY_CLIENT_SECRET = 'your spotify client secret';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/swap', async (req, res) => {
    const { code } = req.body;

    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', 'http://localhost:5050/callback');
    params.append('client_secret', SPOTIFY_CLIENT_SECRET);
    params.append('client_id', SPOTIFY_CLIENT_ID);

    const { data } = await Axios.post('https://accounts.spotify.com/api/token', params);
    return res.send(data);
});

app.post('/refresh', async (req, res) => {
    const { refresh_token } = req.body;

    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refresh_token);
    params.append('client_secret', SPOTIFY_CLIENT_SECRET);
    params.append('client_id', SPOTIFY_CLIENT_ID);

    const { data } = await Axios.post('https://accounts.spotify.com/api/token', params);

    return res.send(data);
});

app.listen(PORT, () => console.log(`Server listening on ${PORT} 🐈`));
