import mongoose from 'mongoose'

const genreSchema = new mongoose.Schema(
  {
    id: Number,
    name: String,
  },
  { _id: false },
)

const castSchema = new mongoose.Schema(
  {
    name: String,
    profile_path: String,
  },
  { _id: false },
)

const movieSchema = new mongoose.Schema(
  {
    tmdbId: { type: Number, required: true, unique: true, index: true },
    title: { type: String, required: true, trim: true },
    overview: { type: String, default: '' },
    poster_path: { type: String, default: '' },
    backdrop_path: { type: String, default: '' },
    genres: [genreSchema],
    casts: [castSchema],
    release_date: String,
    original_language: String,
    tagline: String,
    vote_average: { type: Number, default: 0 },
    vote_count: { type: Number, default: 0 },
    runtime: { type: Number, default: 0 },
  },
  { timestamps: true },
)

export default mongoose.model('Movie', movieSchema)
