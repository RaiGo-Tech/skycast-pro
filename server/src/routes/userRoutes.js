const express = require('express')
const {
  addFavorite,
  getFavorites,
  getHistory,
  getProfile,
  removeFavorite,
  updateProfile,
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

router.use(protect)
router.get('/profile', getProfile)
router.patch('/profile', updateProfile)
router.get('/favorites', getFavorites)
router.post('/favorites', addFavorite)
router.delete('/favorites/:cityName', removeFavorite)
router.get('/history', getHistory)
router.patch('/settings', updateProfile)

module.exports = router
