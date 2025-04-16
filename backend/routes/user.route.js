import express from 'express'
import { getProfile, login, logout, signUp } from '../controllers/user.controller.js';
import { isLogedIn } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/signup', signUp)
router.post('/login', login)
router.post('/logout', logout)
// router.post('/refresh-token', recreateAccessToken)
router.get('/profile', isLogedIn, getProfile )


export default router;