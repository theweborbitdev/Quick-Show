import { isMongoReady } from '../config/db.js'
import { memoryStore } from '../data/memoryStore.js'
import Show from '../models/Show.js'
import asyncHandler from '../middleware/asyncHandler.js'
import { isObjectId, publicShow } from '../utils/ids.js'

export const getShowsByMovie = asyncHandler(async (req, res) => {
  const { movieId } = req.params

  if (isMongoReady()) {
    const query = isObjectId(movieId) ? { movie: movieId } : {}
    const shows = await Show.find(query).populate('movie').sort({ showDateTime: 1 })
    const filteredShows = isObjectId(movieId)
      ? shows
      : shows.filter((show) => String(show.movie?.tmdbId) === String(movieId))

    return res.json({ success: true, data: filteredShows.map(publicShow) })
  }

  const shows = memoryStore.shows.filter((show) => show.movieId === movieId || String(show.movie.tmdbId) === movieId)
  res.json({ success: true, data: shows })
})

export const getShowSeats = asyncHandler(async (req, res) => {
  const { showId } = req.params

  if (isMongoReady()) {
    const show = await Show.findById(showId).populate('movie')
    if (!show) {
      res.status(404)
      throw new Error('Show not found')
    }

    return res.json({
      success: true,
      data: {
        show: publicShow(show),
        occupiedSeats: Object.fromEntries(show.occupiedSeats || []),
      },
    })
  }

  const show = memoryStore.shows.find((item) => item._id === showId)
  if (!show) {
    res.status(404)
    throw new Error('Show not found')
  }

  res.json({ success: true, data: { show, occupiedSeats: show.occupiedSeats } })
})
