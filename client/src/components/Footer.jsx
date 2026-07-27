import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black/30 px-6 py-10 md:px-16 lg:px-36">
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-md">
          <img src={assets.logo} alt="QuickShow" className="mb-4 w-36" />
          <p className="text-sm leading-6 text-gray-400">
            QuickShow helps you explore movies, choose showtimes, pick seats, and keep your bookings in one simple place.
          </p>
        </div>

        <div className="flex flex-wrap gap-5 text-sm text-gray-300">
          <Link to="/">Home</Link>
          <Link to="/movies">Movies</Link>
          <Link to="/favorite">Favorites</Link>
          <Link to="/my-bookings">Bookings</Link>
        </div>
      </div>
      <p className="mt-8 text-sm text-gray-500">Copyright 2026 QuickShow. All rights reserved.</p>
    </footer>
  )
}

export default Footer
