# SkyCast Pro

SkyCast Pro is a premium MERN stack weather forecast platform built for college projects, portfolios, and internship demos.

## Features

- React + Vite frontend with responsive dashboard UI
- Express REST API with MVC structure
- MongoDB/Mongoose models for users, favorites, search history, and weather cache
- JWT authentication with login, register, protected profile dashboard, and admin routes
- Weather search by city or browser geolocation
- Recent searches, favorite cities, AQI, alerts, maps, hourly forecast, 7-day forecast, and charts
- Dark/light mode saved in local storage
- PWA manifest and service worker
- Security middleware: Helmet, CORS, rate limiting, password hashing, input validation
- Demo weather and in-memory auth fallback when MongoDB or API keys are not configured

## Quick Start

```bash
npm run install:all
```

Create env files:

```bash
copy server\.env.example server\.env
copy client\.env.example client\.env
```

Run backend:

```bash
npm run dev:server
```

Run frontend in another terminal:

```bash
npm run dev:client
```

Frontend: `http://localhost:5173`
Backend: `http://localhost:5000/api/health`

## Build Commands

```bash
npm run build
npm run build:vite
npm run vercel-build
npm run preview
```

For direct Vercel import from the repository root, `vercel.json` is already configured to install `client`, build Vite, serve `client/dist`, and support React Router refreshes.

## Demo Login

When MongoDB is not configured, the API includes a demo admin user:

- Email: `demo@skycast.dev`
- Password: `demo123`

## API Routes

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`

### Weather

- `GET /api/weather/current?city=Mumbai`
- `GET /api/weather/hourly?city=Mumbai`
- `GET /api/weather/weekly?city=Mumbai`
- `GET /api/weather/air-quality?city=Mumbai`
- `GET /api/weather/alerts?city=Mumbai`
- `GET /api/weather/suggestions?q=Mu`

### User

- `GET /api/user/profile`
- `PATCH /api/user/profile`
- `GET /api/user/favorites`
- `POST /api/user/favorites`
- `DELETE /api/user/favorites/:cityName`
- `GET /api/user/history`
- `PATCH /api/user/settings`

### Admin

- `GET /api/admin/users`
- `GET /api/admin/stats`
- `GET /api/admin/reports`

## Project Structure

```text
client/
  src/components
  src/context
  src/hooks
  src/pages
  src/routes
  src/services
  src/utils
server/
  src/config
  src/controllers
  src/middleware
  src/models
  src/routes
  src/services
  src/utils
docs/
```

## Deployment

Use `docs/DEPLOYMENT.md` for Vercel, Render/Railway, MongoDB Atlas, and OpenWeatherMap setup.
