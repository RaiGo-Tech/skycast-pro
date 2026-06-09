require('dotenv').config()

const defaultClientUrls = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:4173',
  'http://127.0.0.1:4173',
].join(',')

const vercelClientUrls = [
  process.env.VERCEL_URL,
  process.env.VERCEL_BRANCH_URL,
  process.env.VERCEL_PROJECT_PRODUCTION_URL,
]
  .filter(Boolean)
  .map((url) => (url.startsWith('http') ? url : `https://${url}`))

const configuredClientUrls = (process.env.CLIENT_URL || defaultClientUrls)
  .split(',')
  .map((url) => url.trim())
  .filter(Boolean)

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGODB_URI || '',
  jwtSecret: process.env.JWT_SECRET || 'skycast-pro-dev-secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  clientUrls: [...configuredClientUrls, ...vercelClientUrls],
  weatherApiKey: process.env.WEATHER_API_KEY || '',
  openWeatherApiKey: process.env.OPENWEATHER_API_KEY || '',
}

module.exports = env
