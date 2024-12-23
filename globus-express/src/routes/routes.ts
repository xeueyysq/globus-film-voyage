import { Router } from "express";
import { register, login } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/auth.js";
import { fetchSearchResults } from "../modules/fetchSearchResults.js";
import { addToWatchlist, getWatchlist, removeFromWatchlist } from '../controllers/wishlistController.js';
import { getProfile, updateProfile } from '../controllers/profileController.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);

router.get('/search', authMiddleware, fetchSearchResults);
router.post('/watchlist', authMiddleware, addToWatchlist);
router.get('/watchlist', authMiddleware, getWatchlist);
router.delete('/watchlist/:tmdbId', authMiddleware, removeFromWatchlist);
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);

export default router;