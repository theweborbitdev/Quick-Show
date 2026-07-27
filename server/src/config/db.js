import mongoose from 'mongoose'

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI

  if (!uri) {
    console.log('MONGODB_URI not set. Using in-memory demo data.')
    return
  }

  try {
    await mongoose.connect(uri)
    console.log('MongoDB connected')
  } catch (error) {
    console.error('MongoDB connection failed:', error.message)
    console.log('Falling back to in-memory demo data.')
  }
}

export const isMongoReady = () => mongoose.connection.readyState === 1
