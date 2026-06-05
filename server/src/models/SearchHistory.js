const mongoose = require('mongoose')

const searchHistorySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    searchedCity: { type: String, required: true, trim: true },
    country: { type: String, default: '' },
    searchedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
)

searchHistorySchema.index({ searchedCity: 1, searchedAt: -1 })

module.exports = mongoose.model('SearchHistory', searchHistorySchema)
