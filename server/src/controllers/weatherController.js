const mongoose = require('mongoose')
const SearchHistory = require('../models/SearchHistory')
const WeatherCache = require('../models/WeatherCache')
const { getWeather, getSuggestions } = require('../services/weatherAPIService')
const asyncHandler = require('../utils/asyncHandler')
const memoryStore = require('../utils/memoryStore')
const { success } = require('../utils/responseFormatter')
const { cityOrCoords } = require('../validations/weatherValidation')

const cacheKeyFor = (params) =>
  params.city ? `city:${params.city.toLowerCase()}` : `coords:${params.lat.toFixed(2)},${params.lon.toFixed(2)}`

const persistSearch = async (req, data) => {
  const searchedCity = data.location.city
  memoryStore.history.unshift({
    userId: req.user?._id || req.user?.id || null,
    searchedCity,
    country: data.location.country,
    searchedAt: new Date(),
  })
  memoryStore.history = memoryStore.history.slice(0, 100)

  if (mongoose.connection.readyState === 1) {
    await SearchHistory.create({
      userId: req.user?._id,
      searchedCity,
      country: data.location.country,
    }).catch(() => {})
  }
}

const getCurrentWeather = asyncHandler(async (req, res) => {
  const params = cityOrCoords(req.query)
  const cacheKey = cacheKeyFor(params)
  let data

  if (mongoose.connection.readyState === 1) {
    const cached = await WeatherCache.findOne({ cacheKey })
    data = cached?.weatherData
  }

  if (!data) {
    data = await getWeather(params)
    if (mongoose.connection.readyState === 1) {
      await WeatherCache.findOneAndUpdate(
        { cacheKey },
        { cacheKey, city: data.location.city, weatherData: data, updatedAt: new Date() },
        { upsert: true },
      ).catch(() => {})
    }
  }

  memoryStore.apiUsage.weather += 1
  await persistSearch(req, data)
  success(res, data, 'Weather loaded')
})

const getHourlyWeather = asyncHandler(async (req, res) => {
  const data = await getWeather(cityOrCoords(req.query))
  success(res, data.hourly, 'Hourly forecast loaded')
})

const getWeeklyWeather = asyncHandler(async (req, res) => {
  const data = await getWeather(cityOrCoords(req.query))
  success(res, data.daily, 'Weekly forecast loaded')
})

const getAirQuality = asyncHandler(async (req, res) => {
  const data = await getWeather(cityOrCoords(req.query))
  success(res, data.aqi, 'Air quality loaded')
})

const getAlerts = asyncHandler(async (req, res) => {
  const data = await getWeather(cityOrCoords(req.query))
  success(res, data.alerts, 'Weather alerts loaded')
})

const suggestions = asyncHandler(async (req, res) => {
  const data = await getSuggestions(String(req.query.q || '').trim())
  success(res, data, 'Suggestions loaded')
})

module.exports = {
  getCurrentWeather,
  getHourlyWeather,
  getWeeklyWeather,
  getAirQuality,
  getAlerts,
  suggestions,
}
