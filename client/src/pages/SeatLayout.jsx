import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useParams } from 'react-router-dom'
import { dummyDateTimeData, dummyDashboardData, dummyShowsData } from '../assets/assets'

const seatRows = ['A', 'B', 'C', 'D', 'E', 'F']

const SeatLayout = () => {
  const { id, date } = useParams()
  const [selectedSeats, setSelectedSeats] = useState([])
  const [selectedTime, setSelectedTime] = useState('')
  const movie = dummyShowsData.find((item) => item._id === id || String(item.id) === id)
  const shows = dummyDateTimeData[date] || []
  const occupiedSeats = useMemo(() => {
    const occupied = dummyDashboardData.activeShows.flatMap((show) => Object.keys(show.occupiedSeats || {}))
    return new Set(occupied)
  }, [])

  const seats = useMemo(() => {
    return seatRows.flatMap((row) => Array.from({ length: 10 }, (_, index) => `${row}${index + 1}`))
  }, [])

  const handleSeatClick = (seat) => {
    if (occupiedSeats.has(seat)) {
      toast.error('This seat is already booked')
      return
    }

    setSelectedSeats((current) =>
      current.includes(seat) ? current.filter((item) => item !== seat) : [...current, seat],
    )
  }

  const handleContinue = () => {
    if (!selectedTime) {
      toast.error('Please select a show time')
      return
    }

    if (selectedSeats.length === 0) {
      toast.error('Please select at least one seat')
      return
    }

    toast.success('Booking saved in demo mode')
  }

  return (
    <div className="min-h-screen px-6 pb-16 pt-32 md:px-16 lg:px-36">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase text-primary">{movie?.title || 'Movie show'}</p>
        <h1 className="text-4xl font-bold">Select seats</h1>
        <p className="mt-2 text-gray-400">
          {date ? new Date(date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' }) : 'Choose a date'}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-lg border border-white/10 bg-white/5 p-5">
          <h2 className="mb-4 font-semibold">Available times</h2>
          <div className="grid gap-3">
            {shows.map((show) => (
              <button
                key={show.showId}
                type="button"
                onClick={() => setSelectedTime(show.showId)}
                className={`rounded-lg px-4 py-3 text-left transition ${
                  selectedTime === show.showId ? 'bg-primary' : 'bg-black/30 hover:bg-white/10'
                }`}
              >
                {new Date(show.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </button>
            ))}
          </div>
        </aside>

        <section>
          <div className="mx-auto mb-10 max-w-3xl rounded-t-full border-t-4 border-primary/80 py-4 text-center text-sm uppercase text-gray-400">
            Screen
          </div>
          <div className="mx-auto grid max-w-4xl grid-cols-10 gap-2">
            {seats.map((seat) => {
              const isBooked = occupiedSeats.has(seat)
              const isSelected = selectedSeats.includes(seat)

              return (
                <button
                  key={seat}
                  type="button"
                  disabled={isBooked}
                  onClick={() => handleSeatClick(seat)}
                  className={`h-10 rounded-md text-sm font-medium transition ${
                    isBooked
                      ? 'cursor-not-allowed bg-gray-700 text-gray-500'
                      : isSelected
                        ? 'bg-primary'
                        : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  {seat}
                </button>
              )
            })}
          </div>

          <div className="mt-8 flex flex-col gap-4 rounded-lg border border-white/10 bg-white/5 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold">{selectedSeats.length} seat(s) selected</p>
              <p className="text-sm text-gray-400">{selectedSeats.length ? selectedSeats.join(', ') : 'Choose your seats from the map'}</p>
            </div>
            <Link
              to="/my-bookings"
              onClick={handleContinue}
              className="rounded-full bg-primary px-7 py-3 text-center font-medium transition hover:bg-primary-dull"
            >
              Continue
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

export default SeatLayout
