import Navbar from './components/Navbar'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Movies from './pages/Movies'
import MoviesDetails from './pages/MoviesDetails'
import SeatLayout from './pages/SeatLayout'
import MyBooking from './pages/MyBooking'
import Favorite from './pages/Favorite'
import Footer from './components/Footer'
import {Toaster} from 'react-hot-toast'


function App({ authEnabled = false }) {
  const pathname = useLocation().pathname
  const isAdminRoute = pathname.includes('/admin')

  return (
    <div>
      <Toaster position="top-right" />
      {!isAdminRoute && <Navbar authEnabled={authEnabled} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MoviesDetails />} />
        <Route path="/movies/:id/:date" element={<SeatLayout />} />
        <Route path="/my-bookings" element={<MyBooking />} />
        <Route path="/favorite" element={<Favorite />} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </div>
  )
}

export default App
