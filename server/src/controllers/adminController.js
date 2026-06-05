const mongoose = require('mongoose')
const User = require('../models/User')
const SearchHistory = require('../models/SearchHistory')
const asyncHandler = require('../utils/asyncHandler')
const memoryStore = require('../utils/memoryStore')
const { success } = require('../utils/responseFormatter')

const getUsers = asyncHandler(async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    const users = await User.find().select('-password').sort('-createdAt')
    return success(res, users, 'Users loaded')
  }
  const users = memoryStore.users.map(({ password, ...user }) => user)
  return success(res, users, 'Users loaded')
})

const getStats = asyncHandler(async (req, res) => {
  let totalUsers = memoryStore.users.length
  let mostSearchedCities = []

  if (mongoose.connection.readyState === 1) {
    totalUsers = await User.countDocuments()
    mostSearchedCities = await SearchHistory.aggregate([
      { $group: { _id: '$searchedCity', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 8 },
    ])
  } else {
    const counts = memoryStore.history.reduce((acc, item) => {
      acc[item.searchedCity] = (acc[item.searchedCity] || 0) + 1
      return acc
    }, {})
    mostSearchedCities = Object.entries(counts).map(([city, count]) => ({ _id: city, count }))
  }

  success(
    res,
    {
      totalUsers,
      mostSearchedCities,
      apiUsage: memoryStore.apiUsage,
      uptime: process.uptime(),
    },
    'Admin stats loaded',
  )
})

const getReports = asyncHandler(async (req, res) => {
  success(
    res,
    {
      reportName: 'SkyCast Pro Weather Analytics',
      generatedAt: new Date(),
      apiUsage: memoryStore.apiUsage,
    },
    'Report generated',
  )
})

module.exports = { getUsers, getStats, getReports }
