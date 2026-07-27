import express from 'express'
import { addFavorite, getFavorites, removeFavorite } from '../controllers/favoriteController.js'
import { requireUser } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(requireUser, getFavorites).post(requireUser, addFavorite)
router.delete('/:movieId', requireUser, removeFavorite)

export default router
