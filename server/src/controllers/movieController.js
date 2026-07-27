import { isMongoReady } from '../config/db.js'
import { memoryStore } from '../data/memoryStore.js'
import { seedTrailers } from '../data/seedData.js'
import Movie from '../models/Movie.js'
import asyncHandler from '../middleware/asyncHandler.js'
import { isObjectId, publicMovie } from '../utils/ids.js'

export const getMovies = asyncHandler(async (req, res) => {
  const search = String(req.query.search || '').trim()

  if (isMongoReady()) {
    const query = search
      ? {
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { 'genres.name': { $regex: search, $options: 'i' } },
          ],
        }
      : {}
    const movies = await Movie.find(query).sort({ release_date: -1 })
    return res.json({ success: true, data: movies.map(publicMovie) })
  }

  const query = search.toLowerCase()
  const movies = query
    ? memoryStore.movies.filter((movie) => {
        const genreText = movie.genres.map((genre) => genre.name).join(' ').toLowerCase()
        return movie.title.toLowerCase().includes(query) || genreText.includes(query)
      })
    : memoryStore.movies

  res.json({ success: true, data: movies })
})

export const getMovieById = asyncHandler(async (req, res) => {
  const { id } = req.params

  if (isMongoReady()) {
    const movie = isObjectId(id) ? await Movie.findById(id) : await Movie.findOne({ tmdbId: Number(id) })
    if (!movie) {
      res.status(404)
      throw new Error('Movie not found')
    }
    return res.json({ success: true, data: publicMovie(movie) })
  }

  const movie = memoryStore.movies.find((item) => item._id === id || String(item.tmdbId) === id)
  if (!movie) {
    res.status(404)
    throw new Error('Movie not found')
  }

  res.json({ success: true, data: movie })
})

export const getTrailers = asyncHandler(async (req, res) => {
  res.json({ success: true, data: seedTrailers })
})
