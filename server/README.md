# QuickShow Server

Express API for the QuickShow movie booking app.

## Setup

```bash
cd server
npm install
copy .env.example .env
npm run dev
```

If `MONGODB_URI` is empty, the API runs with in-memory demo data. Add a MongoDB connection string to persist movies, shows, bookings, and favorites.

## Main Routes

- `GET /api/health`
- `GET /api/movies`
- `GET /api/movies/:id`
- `GET /api/shows/movie/:movieId`
- `GET /api/shows/:showId/seats`
- `POST /api/bookings`
- `GET /api/bookings?userId=USER_ID`
- `PATCH /api/bookings/:id/pay`
- `GET /api/favorites?userId=USER_ID`
- `POST /api/favorites`
- `DELETE /api/favorites/:movieId?userId=USER_ID`
- `GET /api/admin/dashboard`
- `POST /api/admin/seed`
