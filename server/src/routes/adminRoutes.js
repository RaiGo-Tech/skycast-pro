const express = require('express')
const { getReports, getStats, getUsers } = require('../controllers/adminController')
const { adminOnly, protect } = require('../middleware/authMiddleware')

const router = express.Router()

router.use(protect, adminOnly)
router.get('/users', getUsers)
router.get('/stats', getStats)
router.get('/reports', getReports)

module.exports = router
