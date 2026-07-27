import { isMongoReady } from '../config/db.js'
import { memoryStore } from '../data/memoryStore.js'
import Favorite from '../models/Favorite.js'
import Movie from '../models/Movie.js'
import asyncHandler from '../middleware/asyncHandler.js'
import { isObjectId, publicMovie } from '../utils/ids.js'

export const getFavorites = asyncHandler(async (req, res) => {
  if (isMongoReady()) {
    const favorites = await Favorite.find({ userId: req.user.id }).populate('movie').sort({ createdAt: -1 })
    return res.json({ success: true, data: favorites.map((favorite) => publicMovie(favorite.movie)) })
  }

  const movieIds = memoryStore.favorites.filter((favorite) => favorite.userId === req.user.id).map((favorite) => favorite.movieId)
  const movies = memoryStore.movies.filter((movie) => movieIds.includes(movie._id))
  res.json({ success: true, data: movies })
})

export const addFavorite = asyncHandler(async (req, res) => {
  const { movieId } = req.body

  if (!movieId) {
    res.status(400)
    throw new Error('movieId is required')
  }

  if (isMongoReady()) {
    const movie = isObjectId(movieId) ? await Movie.findById(movieId) : await Movie.findOne({ tmdbId: Number(movieId) })
    if (!movie) {
      res.status(404)
      throw new Error('Movie not found')
    }

    await Favorite.updateOne({ userId: req.user.id, movie: movie._id }, { userId: req.user.id, movie: movie._id }, { upsert: true })
    return res.status(201).json({ success: true, data: publicMovie(movie) })
  }

  const movie = memoryStore.movies.find((item) => item._id === movieId || String(item.tmdbId) === String(movieId))
  if (!movie) {
    res.status(404)
    throw new Error('Movie not found')
  }

  const exists = memoryStore.favorites.some((favorite) => favorite.userId === req.user.id && favorite.movieId === movie._id)
  if (!exists) {
    memoryStore.favorites.push({ userId: req.user.id, movieId: movie._id })
  }

  res.status(201).json({ success: true, data: movie })
})

export const removeFavorite = asyncHandler(async (req, res) => {
  const { movieId } = req.params

  if (isMongoReady()) {
    const movie = isObjectId(movieId) ? await Movie.findById(movieId) : await Movie.findOne({ tmdbId: Number(movieId) })
    if (movie) {
      await Favorite.deleteOne({ userId: req.user.id, movie: movie._id })
    }
    return res.json({ success: true, data: { movieId } })
  }

  memoryStore.favorites = memoryStore.favorites.filter(
    (favorite) => !(favorite.userId === req.user.id && favorite.movieId === movieId),
  )
  res.json({ success: true, data: { movieId } })
})
