export const seedMovies = [
  {
    tmdbId: 324544,
    title: 'In the Lost Lands',
    overview:
      'A queen sends the powerful sorceress Gray Alys to the ghostly wilderness of the Lost Lands in search of a magical power.',
    poster_path: 'https://image.tmdb.org/t/p/original/dDlfjR7gllmr8HTeN6rfrYhTdwX.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/op3qmNhvwEvyT7UFyPbIfQmKriB.jpg',
    genres: [
      { id: 28, name: 'Action' },
      { id: 14, name: 'Fantasy' },
      { id: 12, name: 'Adventure' },
    ],
    casts: [
      { name: 'Milla Jovovich', profile_path: 'https://image.tmdb.org/t/p/original/usWnHCzbADijULREZYSJ0qfM00y.jpg' },
      { name: 'Dave Bautista', profile_path: 'https://image.tmdb.org/t/p/original/snk6JiXOOoRjPtHU5VMoy6qbd32.jpg' },
      { name: 'Arly Jover', profile_path: 'https://image.tmdb.org/t/p/original/zmznPrQ9GSZwcOIUT0c3GyETwrP.jpg' },
    ],
    release_date: '2025-02-27',
    original_language: 'en',
    tagline: 'She seeks the power to free her people.',
    vote_average: 6.4,
    vote_count: 15000,
    runtime: 102,
  },
  {
    tmdbId: 1232546,
    title: 'Until Dawn',
    overview:
      'Clover and her friends explore an abandoned visitor center and find themselves trapped in a terrifying loop.',
    poster_path: 'https://image.tmdb.org/t/p/original/juA4IWO52Fecx8lhAsxmDgy3M3.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/icFWIk1KfkWLZnugZAJEDauNZ94.jpg',
    genres: [
      { id: 27, name: 'Horror' },
      { id: 9648, name: 'Mystery' },
    ],
    casts: [
      { name: 'Amara Okereke', profile_path: 'https://image.tmdb.org/t/p/original/nTSPtzWu6deZTJtWXHUpACVznY4.jpg' },
      { name: 'Fraser James', profile_path: 'https://image.tmdb.org/t/p/original/mGAPQG2OKTgdKFkp9YpvCSqcbgY.jpg' },
    ],
    release_date: '2025-04-23',
    original_language: 'en',
    tagline: 'Every night a different nightmare.',
    vote_average: 6.4,
    vote_count: 18000,
    runtime: 103,
  },
  {
    tmdbId: 552524,
    title: 'Lilo & Stitch',
    overview: 'A lonely Hawaiian girl and a fugitive alien help mend a broken family.',
    poster_path: 'https://image.tmdb.org/t/p/original/mKKqV23MQ0uakJS8OCE2TfV5jNS.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/7Zx3wDG5bBtcfk8lcnCWDOLM4Y4.jpg',
    genres: [
      { id: 10751, name: 'Family' },
      { id: 35, name: 'Comedy' },
      { id: 878, name: 'Science Fiction' },
    ],
    casts: [
      { name: 'Caoilinn Springall', profile_path: 'https://image.tmdb.org/t/p/original/uZNtbPHowlBYo74U1qlTaRlrdiY.jpg' },
      { name: 'Eveline Hall', profile_path: 'https://image.tmdb.org/t/p/original/uPq4xUPiJIMW5rXF9AT0GrRqgJY.jpg' },
    ],
    release_date: '2025-05-17',
    original_language: 'en',
    tagline: 'Hold on to your coconuts.',
    vote_average: 7.1,
    vote_count: 27500,
    runtime: 108,
  },
  {
    tmdbId: 986056,
    title: 'Thunderbolts*',
    overview:
      'Seven disillusioned castoffs must embark on a dangerous mission and confront the darkest corners of their pasts.',
    poster_path: 'https://image.tmdb.org/t/p/original/m9EtP1Yrzv6v7dMaC9mRaGhd1um.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/rthMuZfFv4fqEU4JVbgSW9wQ8rs.jpg',
    genres: [
      { id: 28, name: 'Action' },
      { id: 878, name: 'Science Fiction' },
      { id: 12, name: 'Adventure' },
    ],
    casts: [
      { name: 'Simon Loof', profile_path: 'https://image.tmdb.org/t/p/original/cbZrB8crWlLEDjVUoak8Liak6s.jpg' },
      { name: 'Tomasz Cymerman', profile_path: 'https://image.tmdb.org/t/p/original/nTSPtzWu6deZTJtWXHUpACVznY4.jpg' },
    ],
    release_date: '2025-04-30',
    original_language: 'en',
    tagline: 'Everyone deserves a second shot.',
    vote_average: 7.4,
    vote_count: 23569,
    runtime: 127,
  },
]

export const seedTrailers = [
  {
    image: 'https://img.youtube.com/vi/WpW36ldAqnM/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=WpW36ldAqnM',
  },
  {
    image: 'https://img.youtube.com/vi/-sAOWhvheK8/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=-sAOWhvheK8',
  },
]

const showDates = ['2026-07-27', '2026-07-28', '2026-07-29', '2026-07-30']
const showTimes = ['13:00:00.000Z', '16:00:00.000Z', '20:00:00.000Z']

export const createMemoryStore = () => {
  const movies = seedMovies.map((movie) => ({
    ...movie,
    _id: String(movie.tmdbId),
    id: movie.tmdbId,
  }))

  const shows = movies.flatMap((movie, movieIndex) =>
    showDates.flatMap((date, dateIndex) =>
      showTimes.map((time, timeIndex) => ({
        _id: `show-${movie._id}-${dateIndex}-${timeIndex}`,
        movieId: movie._id,
        movie,
        showDateTime: `${date}T${time}`,
        showPrice: 49 + movieIndex * 10,
        occupiedSeats: timeIndex === 0 ? { A1: 'demo-user', A2: 'demo-user' } : {},
      })),
    ),
  )

  return {
    movies,
    shows,
    bookings: [],
    favorites: [],
  }
}
