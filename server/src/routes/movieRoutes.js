import express from 'express'
import { getMovieById, getMovies, getTrailers } from '../controllers/movieController.js'

const router = express.Router()

router.get('/', getMovies)
router.get('/trailers', getTrailers)
router.get('/:id', getMovieById)

export default router
