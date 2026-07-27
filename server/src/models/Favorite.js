import mongoose from 'mongoose'

const favoriteSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  },
  { timestamps: true },
)

favoriteSchema.index({ userId: 1, movie: 1 }, { unique: true })

export default mongoose.model('Favorite', favoriteSchema)
