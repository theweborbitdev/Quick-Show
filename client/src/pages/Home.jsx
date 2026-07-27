import { CalendarDays, Clock, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { dummyShowsData, dummyTrailers } from '../assets/assets'

const Home = () => {
  const featuredMovie = dummyShowsData[0]
  const popularMovies = dummyShowsData.slice(0, 4)

  return (
    <div className="min-h-screen">
      <section
        className="relative flex min-h-screen items-center bg-cover bg-center px-6 pt-28 md:px-16 lg:px-36"
        style={{ backgroundImage: `url(${featuredMovie.backdrop_path})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#09090b] via-[#09090b]/80 to-[#09090b]/20" />
        <div className="relative max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase text-primary">Now showing</p>
          <h1 className="max-w-2xl text-5xl font-bold leading-tight md:text-7xl">{featuredMovie.title}</h1>
          <div className="mt-5 flex flex-wrap gap-5 text-sm text-gray-300">
            <span className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-primary text-primary" /> {featuredMovie.vote_average.toFixed(1)}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" /> {featuredMovie.runtime} min
            </span>
            <span className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" /> {new Date(featuredMovie.release_date).getFullYear()}
            </span>
          </div>
          <p className="mt-5 max-w-2xl leading-7 text-gray-300">{featuredMovie.overview}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to={`/movies/${featuredMovie._id}`}
              className="rounded-full bg-primary px-8 py-3 font-medium transition hover:bg-primary-dull"
            >
              Book tickets
            </Link>
            <Link
              to="/movies"
              className="rounded-full border border-white/20 px-8 py-3 font-medium transition hover:bg-white/10"
            >
              Browse movies
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:px-16 lg:px-36">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase text-primary">Featured</p>
            <h2 className="text-3xl font-bold">Recommended movies</h2>
          </div>
          <Link to="/movies" className="text-sm font-medium text-primary">View all</Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {popularMovies.map((movie) => (
            <Link
              to={`/movies/${movie._id}`}
              key={movie._id}
              className="group overflow-hidden rounded-lg bg-white/5 ring-1 ring-white/10 transition hover:-translate-y-1 hover:bg-white/10"
            >
              <img src={movie.poster_path} alt={movie.title} className="aspect-[2/3] w-full object-cover" />
              <div className="p-4">
                <h3 className="line-clamp-1 font-semibold">{movie.title}</h3>
                <p className="mt-2 line-clamp-1 text-sm text-gray-400">
                  {movie.genres.map((genre) => genre.name).join(' / ')}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-6 pb-16 md:px-16 lg:px-36">
        <p className="text-sm font-semibold uppercase text-primary">Trailers</p>
        <h2 className="mb-8 text-3xl font-bold">Latest previews</h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {dummyTrailers.map((trailer) => (
            <a
              key={trailer.videoUrl}
              href={trailer.videoUrl}
              target="_blank"
              rel="noreferrer"
              className="overflow-hidden rounded-lg bg-white/5 ring-1 ring-white/10 transition hover:bg-white/10"
            >
              <img src={trailer.image} alt="Movie trailer" className="aspect-video w-full object-cover" />
              <p className="p-4 text-sm font-medium text-gray-200">Watch trailer</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
