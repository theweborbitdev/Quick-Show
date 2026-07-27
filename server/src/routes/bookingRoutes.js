import express from 'express'
import { createBooking, getMyBookings, markBookingPaid } from '../controllers/bookingController.js'
import { requireUser } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(requireUser, getMyBookings).post(requireUser, createBooking)
router.patch('/:id/pay', requireUser, markBookingPaid)

export default router
