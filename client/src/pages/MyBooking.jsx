import { CalendarDays, CreditCard } from 'lucide-react'
import { dummyBookingData } from '../assets/assets'

const MyBooking = () => {
  return (
    <div className="min-h-screen px-6 pb-16 pt-32 md:px-16 lg:px-36">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase text-primary">Tickets</p>
        <h1 className="text-4xl font-bold">My bookings</h1>
      </div>

      <div className="grid gap-5">
        {dummyBookingData.map((booking, index) => (
          <article
            key={`${booking._id}-${index}`}
            className="grid gap-5 rounded-lg border border-white/10 bg-white/5 p-4 md:grid-cols-[120px_1fr_auto] md:items-center"
          >
            <img src={booking.show.movie.poster_path} alt={booking.show.movie.title} className="h-44 w-full rounded-md object-cover md:h-36" />
            <div>
              <h2 className="text-xl font-semibold">{booking.show.movie.title}</h2>
              <p className="mt-2 flex items-center gap-2 text-sm text-gray-400">
                <CalendarDays className="h-4 w-4" />
                {new Date(booking.show.showDateTime).toLocaleString()}
              </p>
              <p className="mt-2 text-sm text-gray-300">Seats: {booking.bookedSeats.join(', ')}</p>
            </div>
            <div className="text-left md:text-right">
              <p className="text-2xl font-bold">${booking.amount}</p>
              <span
                className={`mt-3 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
                  booking.isPaid ? 'bg-emerald-500/15 text-emerald-300' : 'bg-primary/15 text-primary'
                }`}
              >
                <CreditCard className="h-4 w-4" />
                {booking.isPaid ? 'Paid' : 'Payment due'}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default MyBooking
