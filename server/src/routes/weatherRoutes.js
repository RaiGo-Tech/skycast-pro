const express = require('express')
const {
  getAirQuality,
  getAlerts,
  getCurrentWeather,
  getHourlyWeather,
  getWeeklyWeather,
  suggestions,
} = require('../controllers/weatherController')

const router = express.Router()

router.get('/current', getCurrentWeather)
router.get('/hourly', getHourlyWeather)
router.get('/weekly', getWeeklyWeather)
router.get('/air-quality', getAirQuality)
router.get('/alerts', getAlerts)
router.get('/suggestions', suggestions)

module.exports = router
