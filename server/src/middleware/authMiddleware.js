const mongoose = require('mongoose')
const User = require('../models/User')
const { verifyToken } = require('../config/jwt')
const memoryStore = require('../utils/memoryStore')

const protect = async (req, res, next) => {
  try {
    const header = req.headers.authorization || ''
    const token = header.startsWith('Bearer ') ? header.slice(7) : req.cookies?.token
    if (!token) {
      return res.status(401).json({ success: false, message: 'Authentication required' })
    }

    const decoded = verifyToken(token)
    let user
    if (mongoose.connection.readyState === 1) {
      user = await User.findById(decoded.id)
    } else {
      user = memoryStore.users.find((item) => item.id === decoded.id)
    }

    if (!user) {
      return res.status(401).json({ success: false, message: 'User no longer exists' })
    }

    req.user = user
    next()
  } catch {
    res.status(401).json({ success: false, message: 'Invalid or expired token' })
  }
}

const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin access required' })
  }
  return next()
}

module.exports = { protect, adminOnly }
