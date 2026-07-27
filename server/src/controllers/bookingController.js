import { isMongoReady } from '../config/db.js'
import { memoryStore } from '../data/memoryStore.js'
import Booking from '../models/Booking.js'
import Show from '../models/Show.js'
import asyncHandler from '../middleware/asyncHandler.js'
import { publicShow } from '../utils/ids.js'

const normalizeSeats = (seats) => {
  if (!Array.isArray(seats)) return []
  return [...new Set(seats.map((seat) => String(seat).trim().toUpperCase()).filter(Boolean))]
}

export const createBooking = asyncHandler(async (req, res) => {
  const { showId } = req.body
  const bookedSeats = normalizeSeats(req.body.seats || req.body.bookedSeats)

  if (!showId) {
    res.status(400)
    throw new Error('showId is required')
  }

  if (bookedSeats.length === 0) {
    res.status(400)
    throw new Error('At least one seat is required')
  }

  if (isMongoReady()) {
    const show = await Show.findById(showId).populate('movie')
    if (!show) {
      res.status(404)
      throw new Error('Show not found')
    }

    const occupiedSeats = Object.fromEntries(show.occupiedSeats || [])
    const takenSeats = bookedSeats.filter((seat) => occupiedSeats[seat])
    if (takenSeats.length) {
      res.status(409)
      throw new Error(`Seats already booked: ${takenSeats.join(', ')}`)
    }

    bookedSeats.forEach((seat) => show.occupiedSeats.set(seat, req.user.id))
    await show.save()

    const booking = await Booking.create({
      userId: req.user.id,
      user: { name: req.user.name, email: req.user.email },
      show: show._id,
      bookedSeats,
      amount: bookedSeats.length * show.showPrice,
      isPaid: false,
    })

    const populatedBooking = await booking.populate({ path: 'show', populate: 'movie' })
    return res.status(201).json({ success: true, data: populatedBooking })
  }

  const show = memoryStore.shows.find((item) => item._id === showId)
  if (!show) {
    res.status(404)
    throw new Error('Show not found')
  }

  const takenSeats = bookedSeats.filter((seat) => show.occupiedSeats[seat])
  if (takenSeats.length) {
    res.status(409)
    throw new Error(`Seats already booked: ${takenSeats.join(', ')}`)
  }

  bookedSeats.forEach((seat) => {
    show.occupiedSeats[seat] = req.user.id
  })

  const booking = {
    _id: `booking-${Date.now()}`,
    userId: req.user.id,
    user: { name: req.user.name, email: req.user.email },
    show,
    amount: bookedSeats.length * show.showPrice,
    bookedSeats,
    isPaid: false,
    createdAt: new Date().toISOString(),
  }

  memoryStore.bookings.push(booking)
  res.status(201).json({ success: true, data: booking })
})

export const getMyBookings = asyncHandler(async (req, res) => {
  if (isMongoReady()) {
    const bookings = await Booking.find({ userId: req.user.id })
      .populate({ path: 'show', populate: 'movie' })
      .sort({ createdAt: -1 })

    return res.json({ success: true, data: bookings })
  }

  const bookings = memoryStore.bookings.filter((booking) => booking.userId === req.user.id)
  res.json({ success: true, data: bookings })
})

export const markBookingPaid = asyncHandler(async (req, res) => {
  const { id } = req.params

  if (isMongoReady()) {
    const booking = await Booking.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { isPaid: true },
      { new: true },
    ).populate({ path: 'show', populate: 'movie' })

    if (!booking) {
      res.status(404)
      throw new Error('Booking not found')
    }

    return res.json({ success: true, data: booking })
  }

  const booking = memoryStore.bookings.find((item) => item._id === id && item.userId === req.user.id)
  if (!booking) {
    res.status(404)
    throw new Error('Booking not found')
  }

  booking.isPaid = true
  res.json({ success: true, data: booking })
})

export const getAllBookings = asyncHandler(async (req, res) => {
  if (isMongoReady()) {
    const bookings = await Booking.find().populate({ path: 'show', populate: 'movie' }).sort({ createdAt: -1 })
    return res.json({ success: true, data: bookings })
  }

  res.json({ success: true, data: memoryStore.bookings.map((booking) => ({ ...booking, show: publicShow(booking.show) })) })
})
