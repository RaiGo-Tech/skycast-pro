# SkyCast Pro Deployment Guide

## Frontend on Vercel

### Direct root deploy

This repository is ready to import directly from the project root. Vercel will read `vercel.json` and use:

- Install command: `npm ci --prefix client`
- Build command: `npm run vercel-build`
- Output directory: `client/dist`
- Framework: Vite
- SPA rewrite: all app routes fall back to `index.html`

Steps:

1. Push the repository to GitHub.
2. Import the repository in Vercel.
3. Keep the project root as the repository root.
4. Add `VITE_API_URL=https://your-backend-domain.com/api` if you deploy the backend separately.
5. Click Deploy.

### Client-folder deploy

1. Push the repository to GitHub.
2. Import the `client` folder as the Vercel project root.
3. Add `VITE_API_URL=https://your-backend.onrender.com/api`.
4. Build command: `npm run build`.
5. Output directory: `dist`.

## Backend on Render or Railway

1. Create a Node.js web service using the `server` folder.
2. Start command: `npm run start`.
3. Add environment variables from `server/.env.example`.
4. Set `CLIENT_URL` to your deployed Vercel URL.

## Database on MongoDB Atlas

1. Create a free cluster.
2. Create a database user.
3. Allow your backend host IP or use `0.0.0.0/0` for college demos.
4. Copy the connection string into `MONGODB_URI`.

## Weather API

1. Create an OpenWeatherMap API key.
2. Put it in `OPENWEATHER_API_KEY`.
3. Without a key, the backend serves polished demo weather data for presentations.
