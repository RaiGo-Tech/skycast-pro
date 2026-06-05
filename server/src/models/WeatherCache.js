const mongoose = require('mongoose')

const weatherCacheSchema = new mongoose.Schema(
  {
    cacheKey: { type: String, required: true, unique: true },
    city: { type: String, required: true },
    weatherData: { type: Object, required: true },
    updatedAt: { type: Date, default: Date.now, expires: 900 },
  },
  { timestamps: true },
)

module.exports = mongoose.model('WeatherCache', weatherCacheSchema)
