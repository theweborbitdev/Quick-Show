import express from 'express'
import { getShowSeats, getShowsByMovie } from '../controllers/showController.js'

const router = express.Router()

router.get('/movie/:movieId', getShowsByMovie)
router.get('/:showId/seats', getShowSeats)

export default router
