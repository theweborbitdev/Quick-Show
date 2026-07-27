import { isMongoReady } from '../config/db.js'
import { memoryStore } from '../data/memoryStore.js'
import { seedMovies } from '../data/seedData.js'
import Booking from '../models/Booking.js'
import Movie from '../models/Movie.js'
import Show from '../models/Show.js'
import asyncHandler from '../middleware/asyncHandler.js'

export const getDashboard = asyncHandler(async (req, res) => {
  if (isMongoReady()) {
    const [totalBookings, totalMovies, activeShows, bookings] = await Promise.all([
      Booking.countDocuments(),
      Movie.countDocuments(),
      Show.countDocuments({ showDateTime: { $gte: new Date() } }),
      Booking.find(),
    ])

    const totalRevenue = bookings.reduce((sum, booking) => sum + (booking.isPaid ? booking.amount : 0), 0)
    return res.json({ success: true, data: { totalBookings, totalMovies, activeShows, totalRevenue } })
  }

  const totalRevenue = memoryStore.bookings.reduce((sum, booking) => sum + (booking.isPaid ? booking.amount : 0), 0)
  res.json({
    success: true,
    data: {
      totalBookings: memoryStore.bookings.length,
      totalMovies: memoryStore.movies.length,
      activeShows: memoryStore.shows.length,
      totalRevenue,
    },
  })
})

export const seedDatabase = asyncHandler(async (req, res) => {
  if (!isMongoReady()) {
    return res.json({
      success: true,
      message: 'MongoDB is not connected. In-memory data is already available.',
      data: { movies: memoryStore.movies.length, shows: memoryStore.shows.length },
    })
  }

  await Movie.deleteMany({})
  await Show.deleteMany({})
  await Booking.deleteMany({})

  const movies = await Movie.insertMany(seedMovies)
  const showDocs = movies.flatMap((movie, movieIndex) => {
    return ['2026-07-27', '2026-07-28', '2026-07-29', '2026-07-30'].flatMap((date) => {
      return ['13:00:00.000Z', '16:00:00.000Z', '20:00:00.000Z'].map((time) => ({
        movie: movie._id,
        showDateTime: new Date(`${date}T${time}`),
        showPrice: 49 + movieIndex * 10,
        occupiedSeats: {},
      }))
    })
  })

  const shows = await Show.insertMany(showDocs)
  res.status(201).json({ success: true, data: { movies: movies.length, shows: shows.length } })
})
