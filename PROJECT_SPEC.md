# QuickShow Project Specification

## Overview

QuickShow is a movie ticket booking application with a React/Vite frontend and an Express backend API. The current project supports browsing movies, viewing movie details, selecting show dates and seats, creating bookings, managing favorites, and reading basic admin dashboard metrics.

## Tech Stack

### Frontend

- React 19
- Vite 8
- React Router
- Tailwind CSS 4
- Clerk React for authentication UI
- React Hot Toast for notifications
- Lucide React for icons

### Backend

- Node.js
- Express
- MongoDB with Mongoose
- CORS
- Helmet
- Morgan
- Dotenv

## Project Structure

```text
QuickShow/
  client/
    src/
      assets/
      components/
      pages/
      App.jsx
      main.jsx
      index.css
    package.json
    vite.config.js
  server/
    src/
      config/
      controllers/
      data/
      middleware/
      models/
      routes/
      utils/
      app.js
      server.js
    package.json
    .env.example
    README.md
  PROJECT_SPEC.md
```

## Frontend Features

- Home page with hero movie, recommended movies, and trailer links.
- Movies page with movie grid and client-side search by title or genre.
- Movie details page with overview, genres, rating, runtime, cast list, trailer link, and date selection.
- Seat layout page with showtime selection, seat selection, occupied seats, and booking validation.
- My bookings page showing demo ticket data.
- Favorites page showing saved demo movies.
- Responsive navbar with Clerk login/user button.
- Footer with app links and summary.

## Backend Features

- Express API server.
- MongoDB support through `MONGODB_URI`.
- Automatic in-memory demo mode when MongoDB is not configured.
- Movie listing and movie detail endpoints.
- Trailer endpoint.
- Showtimes by movie endpoint.
- Seat availability endpoint.
- Booking creation with seat conflict protection.
- User booking listing.
- Mark booking as paid.
- Favorites add/list/remove.
- Admin dashboard stats.
- MongoDB seed endpoint.
- Central error handling.
- Lightweight user middleware using `x-user-id` or `userId`.

## Environment Variables

### Client

Create `client/.env.local`:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

Only `VITE_` variables are exposed to the browser. Do not use `CLERK_SECRET_KEY` in frontend code.

### Server

Create `server/.env`:

```env
PORT=5000
CLIENT_URL=http://127.0.0.1:5173
MONGODB_URI=your_mongodb_connection_string
```

If `MONGODB_URI` is empty, the server runs with in-memory demo data.

## Run Commands

### Frontend

```bash
cd client
npm install
npm run dev
```

### Backend

```bash
cd server
npm install
npm run dev
```

### Checks

```bash
cd client
npm run lint
npm run build
```

```bash
cd server
npm run check
```

## API Base URL

Default backend URL:

```text
http://127.0.0.1:5000
```

## API Endpoints

### Health

`GET /api/health`

Returns API health, current storage mode, and timestamp.

### Movies

`GET /api/movies`

Returns all movies.

`GET /api/movies?search=query`

Searches movies by title or genre.

`GET /api/movies/:id`

Returns one movie by Mongo `_id` or TMDB id.

`GET /api/movies/trailers`

Returns demo trailer links.

### Shows

`GET /api/shows/movie/:movieId`

Returns showtimes for a movie.

`GET /api/shows/:showId/seats`

Returns show details and occupied seats.

### Bookings

`GET /api/bookings`

Requires user identity through `x-user-id` header or `userId` query.

`POST /api/bookings`

Creates a booking and locks selected seats.

Request:

```json
{
  "showId": "show-id",
  "seats": ["B4", "B5"]
}
```

Headers:

```text
x-user-id: user-id
x-user-name: User Name
x-user-email: user@example.com
```

`PATCH /api/bookings/:id/pay`

Marks a booking as paid.

### Favorites

`GET /api/favorites`

Returns current user's favorite movies.

`POST /api/favorites`

Request:

```json
{
  "movieId": "324544"
}
```

`DELETE /api/favorites/:movieId`

Removes a movie from favorites.

### Admin

`GET /api/admin/dashboard`

Returns total bookings, movies, active shows, and paid revenue.

`GET /api/admin/bookings`

Returns all bookings.

`POST /api/admin/seed`

Seeds MongoDB with demo movies and shows. In memory mode, returns existing demo data status.

## Data Models

### Movie

- `tmdbId`
- `title`
- `overview`
- `poster_path`
- `backdrop_path`
- `genres`
- `casts`
- `release_date`
- `original_language`
- `tagline`
- `vote_average`
- `vote_count`
- `runtime`

### Show

- `movie`
- `showDateTime`
- `showPrice`
- `occupiedSeats`

### Booking

- `userId`
- `user.name`
- `user.email`
- `show`
- `amount`
- `bookedSeats`
- `isPaid`

### Favorite

- `userId`
- `movie`

## Current Status

- Frontend is complete as a working demo UI.
- Backend is complete as a functional API.
- Backend can run without MongoDB using in-memory demo data.
- MongoDB persistence is ready when `MONGODB_URI` is provided.

## Remaining Integration Work

- Connect frontend pages to backend API instead of local dummy data.
- Replace demo user headers with Clerk server-side token verification.
- Add real payment gateway integration.
- Add admin UI pages.
- Add production deployment configuration.
