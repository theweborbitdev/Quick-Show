import mongoose from 'mongoose'

export const isObjectId = (value) => mongoose.Types.ObjectId.isValid(value)

export const publicMovie = (movie) => {
  if (!movie) return null
  const plain = typeof movie.toObject === 'function' ? movie.toObject() : movie
  return {
    ...plain,
    id: plain.tmdbId || plain.id,
    _id: String(plain._id),
  }
}

export const publicShow = (show) => {
  if (!show) return null
  const plain = typeof show.toObject === 'function' ? show.toObject() : show
  const occupiedSeats = plain.occupiedSeats instanceof Map ? Object.fromEntries(plain.occupiedSeats) : plain.occupiedSeats || {}

  return {
    ...plain,
    _id: String(plain._id),
    movie: publicMovie(plain.movie),
    occupiedSeats,
  }
}
