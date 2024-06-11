import express from 'express';
import { login } from '../controller/Auth.js';
import { register } from '../controller/Register.js';
import { userplaylists } from '../controller/UserPlaylists.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/getUserPlaylists', userplaylists);

export default router;