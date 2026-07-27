import mongoose from 'mongoose'

const showSchema = new mongoose.Schema(
  {
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    showDateTime: { type: Date, required: true, index: true },
    showPrice: { type: Number, required: true, min: 0 },
    occupiedSeats: { type: Map, of: String, default: {} },
  },
  { timestamps: true },
)

export default mongoose.model('Show', showSchema)
