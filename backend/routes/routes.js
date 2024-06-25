import express from 'express';
import { login } from '../controller/Auth.js';
import { register } from '../controller/Register.js';
import { userplaylists } from '../controller/Read/GetUserPlaylists.js';
import { getAllTags } from '../controller/Read/GetTags.js';
import { insertPlaylist } from '../controller/Create/InsertPlaylist.js';
import { updatePlaylist } from '../controller/Update/UpdatePlaylist.js';
import { insertSpotifyPlaylist } from '../controller/Create/InsertSpotifyPlaylist.js';
import { getUsernameById } from '../controller/Read/GetUsernameById.js';
import { getRandomPlaylists } from '../controller/Read/GetRandomPlaylists.js';
import { getPlaylistById } from '../controller/Read/GetPlaylistById.js';
import { getUserDetails } from '../controller/Read/GetUserDetails.js';
import { followUser } from '../controller/Create/FollowUser.js';
import { unFollowUser } from '../controller/Delete/UnFollowUser.js';
import { isFollower } from '../controller/Read/IsFollower.js';
import { recentFollowedPlaylists } from '../controller/Read/RecentFollowedPlaylists.js';

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
router.get('/get-user-details', getUserDetails);
router.post('/follow-user', followUser);
router.post('/unfollow-user', unFollowUser);
router.post('/is-follower', isFollower);
router.get('/get-recent-followed-playlists', recentFollowedPlaylists);
export default router;