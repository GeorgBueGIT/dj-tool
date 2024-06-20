import express from 'express';
import { login } from '../controller/Auth.js';
import { register } from '../controller/Register.js';
import { userplaylists } from '../controller/UserPlaylists.js';
import { getAllTags } from '../controller/Tags.js';
import { insertPlaylist } from '../controller/InsertPlaylist.js';
import { updatePlaylist } from '../controller/UpdatePlaylist.js';
import { insertSpotifyPlaylist } from '../controller/InsertSpotifyPlaylist.js';
import { getUsernameById } from '../controller/GetUsernameById.js';
import { getRandomPlaylists } from '../controller/GetRandomPlaylists.js';
import { getPlaylistById } from '../controller/GetPlaylistById.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/getUserPlaylists', userplaylists);
router.get('/getAllTags', getAllTags);
router.post('/insert-playlist', insertPlaylist);
router.post('/update-playlist', updatePlaylist);
router.post('/insert-spotify-playlist', insertSpotifyPlaylist);
router.get('/get-username-by-id', getUsernameById);
router.get('/get-random-playlists', getRandomPlaylists);
router.get('/get-playlist-by-id', getPlaylistById);

export default router;