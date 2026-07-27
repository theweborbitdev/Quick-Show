import { CalendarDays, Clock, Heart, Star } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { dummyDateTimeData, dummyShowsData, dummyTrailers } from '../assets/assets'

const MoviesDetails = () => {
  const { id } = useParams()
  const movie = dummyShowsData.find((item) => item._id === id || String(item.id) === id)

  if (!movie) {
    return (
      <div className="min-h-screen px-6 pt-32 text-center md:px-16 lg:px-36">
        <h1 className="text-3xl font-bold">Movie not found</h1>
        <Link to="/movies" className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 font-medium">
          Back to movies
        </Link>
      </div>
    )
  }

  const dates = Object.keys(dummyDateTimeData)

  return (
    <div className="min-h-screen pb-16">
      <section
        className="relative bg-cover bg-center px-6 pt-32 md:px-16 lg:px-36"
        style={{ backgroundImage: `url(${movie.backdrop_path})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/85 to-[#09090b]/40" />
        <div className="relative grid gap-10 pb-14 md:grid-cols-[280px_1fr]">
          <img src={movie.poster_path} alt={movie.title} className="w-full rounded-lg object-cover shadow-2xl" />
          <div className="self-end">
            <p className="mb-3 text-sm font-semibold uppercase text-primary">{movie.genres.map((genre) => genre.name).join(' / ')}</p>
            <h1 className="text-4xl font-bold md:text-6xl">{movie.title}</h1>
            <p className="mt-4 max-w-3xl leading-7 text-gray-300">{movie.overview}</p>
            <div className="mt-5 flex flex-wrap gap-5 text-sm text-gray-300">
              <span className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-primary text-primary" /> {movie.vote_average.toFixed(1)}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" /> {movie.runtime} min
              </span>
              <span className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" /> {new Date(movie.release_date).toLocaleDateString()}
              </span>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={dummyTrailers[0].videoUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/20 px-6 py-3 font-medium hover:bg-white/10"
              >
                Watch trailer
              </a>
              <button type="button" className="rounded-full border border-white/20 p-3 hover:bg-white/10" aria-label="Add to favorites">
                <Heart className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-10 md:px-16 lg:px-36">
        <h2 className="mb-5 text-2xl font-bold">Choose date</h2>
        <div className="flex flex-wrap gap-3">
          {dates.map((date) => (
            <Link
              key={date}
              to={`/movies/${movie._id}/${date}`}
              className="rounded-lg border border-white/10 bg-white/5 px-5 py-4 text-center transition hover:bg-primary"
            >
              <span className="block text-sm text-gray-300">{new Date(date).toLocaleDateString(undefined, { weekday: 'short' })}</span>
              <span className="font-semibold">{new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-16 lg:px-36">
        <h2 className="mb-5 text-2xl font-bold">Top cast</h2>
        <div className="flex gap-5 overflow-x-auto pb-4">
          {movie.casts.slice(0, 12).map((cast) => (
            <div key={cast.name} className="w-24 shrink-0 text-center">
              <img src={cast.profile_path} alt={cast.name} className="h-24 w-24 rounded-full object-cover" />
              <p className="mt-2 line-clamp-2 text-sm text-gray-300">{cast.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default MoviesDetails
