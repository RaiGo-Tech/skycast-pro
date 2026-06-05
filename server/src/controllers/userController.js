const mongoose = require('mongoose')
const FavoriteCity = require('../models/FavoriteCity')
const SearchHistory = require('../models/SearchHistory')
const User = require('../models/User')
const asyncHandler = require('../utils/asyncHandler')
const memoryStore = require('../utils/memoryStore')
const { success } = require('../utils/responseFormatter')

const getProfile = asyncHandler(async (req, res) => {
  success(res, { user: req.user }, 'Profile loaded')
})

const updateProfile = asyncHandler(async (req, res) => {
  const updates = {
    name: req.body.name || req.user.name,
    preferences: req.body.preferences || req.user.preferences,
  }

  if (mongoose.connection.readyState === 1) {
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true })
    return success(res, { user }, 'Profile updated')
  }

  Object.assign(req.user, updates)
  return success(res, { user: req.user }, 'Profile updated')
})

const getFavorites = asyncHandler(async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    const favorites = await FavoriteCity.find({ userId: req.user._id }).sort('-createdAt')
    return success(res, favorites, 'Favorites loaded')
  }
  const favorites = memoryStore.favorites.filter((item) => item.userId === req.user.id)
  return success(res, favorites, 'Favorites loaded')
})

const addFavorite = asyncHandler(async (req, res) => {
  const city = {
    userId: req.user._id || req.user.id,
    cityName: req.body.cityName,
    country: req.body.country || '',
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  }

  if (mongoose.connection.readyState === 1) {
    const favorite = await FavoriteCity.findOneAndUpdate(
      { userId: req.user._id, cityName: city.cityName },
      city,
      { upsert: true, new: true },
    )
    return success(res, favorite, 'Favorite saved', 201)
  }

  const exists = memoryStore.favorites.find(
    (item) => item.userId === req.user.id && item.cityName.toLowerCase() === city.cityName.toLowerCase(),
  )
  if (!exists) memoryStore.favorites.unshift(city)
  return success(res, exists || city, 'Favorite saved', 201)
})

const removeFavorite = asyncHandler(async (req, res) => {
  const cityName = req.params.cityName
  if (mongoose.connection.readyState === 1) {
    await FavoriteCity.findOneAndDelete({ userId: req.user._id, cityName })
  } else {
    memoryStore.favorites = memoryStore.favorites.filter(
      (item) => !(item.userId === req.user.id && item.cityName === cityName),
    )
  }
  success(res, null, 'Favorite removed')
})

const getHistory = asyncHandler(async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    const history = await SearchHistory.find({ userId: req.user._id }).sort('-searchedAt').limit(20)
    return success(res, history, 'History loaded')
  }
  const history = memoryStore.history.filter((item) => item.userId === req.user.id).slice(0, 20)
  return success(res, history, 'History loaded')
})

module.exports = {
  getProfile,
  updateProfile,
  getFavorites,
  addFavorite,
  removeFavorite,
  getHistory,
}
