import { Search, Star } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { dummyShowsData } from '../assets/assets'

const Movies = () => {
  const [search, setSearch] = useState('')

  const movies = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return dummyShowsData

    return dummyShowsData.filter((movie) => {
      const genreText = movie.genres.map((genre) => genre.name).join(' ').toLowerCase()
      return movie.title.toLowerCase().includes(query) || genreText.includes(query)
    })
  }, [search])

  return (
    <div className="min-h-screen px-6 pb-16 pt-32 md:px-16 lg:px-36">
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-primary">Movies</p>
          <h1 className="text-4xl font-bold">Now showing</h1>
        </div>
        <label className="flex w-full items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-3 md:w-80">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search movies or genres"
            className="w-full bg-transparent text-sm outline-none placeholder:text-gray-500"
          />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {movies.map((movie) => (
          <article key={movie._id} className="overflow-hidden rounded-lg bg-white/5 ring-1 ring-white/10">
            <img src={movie.poster_path} alt={movie.title} className="aspect-[2/3] w-full object-cover" />
            <div className="p-4">
              <div className="mb-2 flex items-start justify-between gap-3">
                <h2 className="font-semibold">{movie.title}</h2>
                <span className="flex items-center gap-1 text-sm text-primary">
                  <Star className="h-4 w-4 fill-primary" /> {movie.vote_average.toFixed(1)}
                </span>
              </div>
              <p className="line-clamp-1 text-sm text-gray-400">{movie.genres.map((genre) => genre.name).join(' / ')}</p>
              <Link
                to={`/movies/${movie._id}`}
                className="mt-4 inline-flex rounded-full bg-primary px-5 py-2 text-sm font-medium transition hover:bg-primary-dull"
              >
                Details
              </Link>
            </div>
          </article>
        ))}
      </div>

      {movies.length === 0 && (
        <div className="rounded-lg border border-white/10 bg-white/5 p-10 text-center text-gray-400">
          No movies found for "{search}".
        </div>
      )}
    </div>
  )
}

export default Movies
