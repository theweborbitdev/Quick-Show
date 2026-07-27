import { Heart, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { dummyShowsData } from '../assets/assets'

const Favorite = () => {
  const favorites = dummyShowsData.slice(1, 5)

  return (
    <div className="min-h-screen px-6 pb-16 pt-32 md:px-16 lg:px-36">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase text-primary">Saved</p>
        <h1 className="text-4xl font-bold">Favorite movies</h1>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {favorites.map((movie) => (
          <article key={movie._id} className="overflow-hidden rounded-lg bg-white/5 ring-1 ring-white/10">
            <div className="relative">
              <img src={movie.poster_path} alt={movie.title} className="aspect-[2/3] w-full object-cover" />
              <span className="absolute right-3 top-3 rounded-full bg-black/60 p-2 text-primary">
                <Heart className="h-5 w-5 fill-primary" />
              </span>
            </div>
            <div className="p-4">
              <div className="mb-2 flex items-start justify-between gap-3">
                <h2 className="font-semibold">{movie.title}</h2>
                <span className="flex items-center gap-1 text-sm text-primary">
                  <Star className="h-4 w-4 fill-primary" /> {movie.vote_average.toFixed(1)}
                </span>
              </div>
              <p className="line-clamp-2 text-sm text-gray-400">{movie.tagline}</p>
              <Link
                to={`/movies/${movie._id}`}
                className="mt-4 inline-flex rounded-full bg-primary px-5 py-2 text-sm font-medium transition hover:bg-primary-dull"
              >
                Book now
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default Favorite
