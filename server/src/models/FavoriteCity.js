const mongoose = require('mongoose')

const favoriteCitySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    cityName: { type: String, required: true, trim: true },
    country: { type: String, default: '' },
    latitude: { type: Number },
    longitude: { type: Number },
  },
  { timestamps: true },
)

favoriteCitySchema.index({ userId: 1, cityName: 1 }, { unique: true })

module.exports = mongoose.model('FavoriteCity', favoriteCitySchema)
