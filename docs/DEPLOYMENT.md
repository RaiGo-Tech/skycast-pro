# SkyCast Pro Deployment Guide

## Frontend on Vercel

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
