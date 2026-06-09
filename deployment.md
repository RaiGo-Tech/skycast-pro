# SkyCast Pro Deployment Guide

This guide explains how to deploy SkyCast Pro from the repository root. The app has two parts:

- `client/`: React + Vite frontend
- `server/`: Express + MongoDB backend API

For the cleanest production setup, deploy the frontend and Express API together on Vercel. Render, Railway, or another Node.js host can still be used as an optional separate backend.

## 1. Pre-Deployment Checklist

Before deploying, make sure the project builds locally:

```bash
npm run install:all
npm run build
npm run lint --prefix client
```

Local development URLs:

- Frontend: `http://localhost:5173`
- Backend health: `http://localhost:5000/api/health`

## 2. Required Environment Variables

Use placeholders in production. Do not commit real secrets.

### Frontend

Set these in Vercel or in `client/.env` for local development:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-public-key
```

For local development:

```env
VITE_API_URL=http://localhost:5000/api
```

### Backend

Set these in Vercel or in `server/.env` locally:

```env
PORT=5000
CLIENT_URL=https://your-frontend-domain.vercel.app
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/skycast-pro
JWT_SECRET=replace-with-a-long-random-secret
WEATHER_API_KEY=your-weatherapi-com-key
OPENWEATHER_API_KEY=your-openweather-api-key
```

If `MONGODB_URI` or weather API keys are missing, the app can still use demo/fallback data for college presentations.

## 3. Deploy Full-Stack App on Vercel

The root `vercel.json` is configured for Vite plus the Express API function at `api/index.js`.

Vercel will use:

- Install command: `npm ci --prefix client && npm ci --prefix server`
- Build command: `npm run vercel-build`
- Output directory: `client/dist`
- API rewrite: `/api/:path*` routes to the Express function
- SPA rewrite: all non-API routes fallback to `index.html`

Steps:

1. Push the project to GitHub.
2. Open Vercel and import the repository.
3. Keep the project root as the root directory.
4. Add production environment variables:

```env
WEATHER_API_KEY=your-weatherapi-com-key
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-public-key
```

5. Deploy.

After deployment, test these frontend routes:

- `/`
- `/weather`
- `/about`
- `/login`
- `/register`

## 4. Deploy Backend on Render

Recommended Render settings:

- Root directory: `server`
- Runtime: Node.js
- Build command: `npm install`
- Start command: `npm run start`

Add backend environment variables:

```env
PORT=5000
CLIENT_URL=https://your-frontend-domain.vercel.app
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/skycast-pro
JWT_SECRET=replace-with-a-long-random-secret
OPENWEATHER_API_KEY=your-openweather-api-key
```

After deployment, test:

```text
https://your-backend-domain.com/api/health
```

## 5. Deploy Backend on Railway

Recommended Railway settings:

- Project root: `server`
- Start command: `npm run start`

Add the same backend environment variables listed above.

After deployment, copy the Railway backend URL and update the Vercel frontend variable:

```env
VITE_API_URL=https://your-railway-backend-domain.com/api
```

Then redeploy the Vercel frontend.

## 6. MongoDB Atlas Setup

1. Create a MongoDB Atlas account.
2. Create a free cluster.
3. Create a database user.
4. Allow network access for your backend host.
5. For college demos, you can temporarily allow `0.0.0.0/0`.
6. Copy the connection string into `MONGODB_URI`.

Example:

```env
MONGODB_URI=mongodb+srv://skycast-user:password@cluster.mongodb.net/skycast-pro
```

## 7. OpenWeatherMap Setup

1. Create an OpenWeatherMap account.
2. Generate an API key.
3. Add it to backend environment variables:

```env
OPENWEATHER_API_KEY=your-openweather-api-key
```

If the key is not configured, SkyCast Pro will show demo weather data.

## 8. CORS Setup

Make sure the backend `CLIENT_URL` exactly matches your deployed frontend URL:

```env
CLIENT_URL=https://your-frontend-domain.vercel.app
```

If CORS fails, check:

- The frontend URL has no trailing slash.
- `VITE_API_URL` ends with `/api`.
- The backend is redeployed after changing `CLIENT_URL`.
- The frontend is redeployed after changing `VITE_API_URL`.

## 9. Production Test Flow

After both frontend and backend are deployed:

1. Open the Vercel frontend URL.
2. Visit `/weather`.
3. Search a city such as `Mumbai` or `Delhi`.
4. Check current weather, hourly forecast, weekly forecast, AQI, alerts, and map.
5. Open `/register` and create a user.
6. Login from `/login`.
7. Open `/dashboard`.
8. Save a favorite city.

## 10. Common Problems

### Frontend shows demo data

Check:

```env
VITE_API_URL=https://your-backend-domain.com/api
```

Then redeploy frontend.

### Backend cannot connect to MongoDB

Check:

- `MONGODB_URI` is correct.
- MongoDB user/password is correct.
- Atlas network access allows your hosting provider.

### Login or register fails

Check:

- Backend is running.
- `JWT_SECRET` is set.
- `CLIENT_URL` matches the frontend URL.
- Browser console does not show CORS errors.

### Vercel refresh gives 404

The root `vercel.json` already has SPA rewrite support. If you deploy from inside `client/`, add a Vercel rewrite that sends all routes to `index.html`.

## 11. Final Deployment Checklist

- Frontend deployed on Vercel
- Express API deployed through Vercel function `api/index.js`
- `/api/health` works on the Vercel domain
- `CLIENT_URL` points to frontend URL
- `MONGODB_URI` configured
- `JWT_SECRET` configured
- `WEATHER_API_KEY` or `OPENWEATHER_API_KEY` configured, or demo mode accepted
- `/api/health` works
- `/weather` works
- Login/register works
- Dashboard loads after login

## Useful Commands

```bash
npm run install:all
npm run dev:client
npm run dev:server
npm run build
npm run preview
npm run lint --prefix client
```
