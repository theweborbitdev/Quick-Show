import express from 'express'
import { getAllBookings } from '../controllers/bookingController.js'
import { getDashboard, seedDatabase } from '../controllers/adminController.js'

const router = express.Router()

router.get('/dashboard', getDashboard)
router.get('/bookings', getAllBookings)
router.post('/seed', seedDatabase)

export default router
