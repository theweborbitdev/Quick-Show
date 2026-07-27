import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import adminRoutes from './routes/adminRoutes.js'
import bookingRoutes from './routes/bookingRoutes.js'
import favoriteRoutes from './routes/favoriteRoutes.js'
import movieRoutes from './routes/movieRoutes.js'
import showRoutes from './routes/showRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import { isMongoReady } from './config/db.js'

const app = express()

app.use(helmet())
app.use(cors({ origin: process.env.CLIENT_URL || true, credentials: true }))
app.use(express.json({ limit: '1mb' }))
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    service: 'quickshow-api',
    database: isMongoReady() ? 'mongodb' : 'memory',
    timestamp: new Date().toISOString(),
  })
})

app.use('/api/movies', movieRoutes)
app.use('/api/shows', showRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/favorites', favoriteRoutes)
app.use('/api/admin', adminRoutes)

app.use(notFound)
app.use(errorHandler)

export default app
