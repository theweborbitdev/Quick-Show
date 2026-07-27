import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    user: {
      name: { type: String, default: 'QuickShow User' },
      email: { type: String, default: '' },
    },
    show: { type: mongoose.Schema.Types.ObjectId, ref: 'Show', required: true },
    amount: { type: Number, required: true, min: 0 },
    bookedSeats: [{ type: String, required: true }],
    isPaid: { type: Boolean, default: false },
  },
  { timestamps: true },
)

export default mongoose.model('Booking', bookingSchema)
