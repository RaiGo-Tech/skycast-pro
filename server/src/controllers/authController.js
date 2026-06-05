const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const User = require('../models/User')
const asyncHandler = require('../utils/asyncHandler')
const generateToken = require('../utils/generateToken')
const memoryStore = require('../utils/memoryStore')
const { success } = require('../utils/responseFormatter')
const { sendPasswordResetEmail } = require('../services/emailService')

const sanitizeUser = (user) => ({
  id: user._id || user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  avatar: user.avatar || '',
  preferences: user.preferences || {},
})

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  let user

  if (mongoose.connection.readyState === 1) {
    const exists = await User.findOne({ email })
    if (exists) return res.status(409).json({ success: false, message: 'Email already registered' })
    user = await User.create({ name, email, password })
  } else {
    const exists = memoryStore.users.find((item) => item.email === email)
    if (exists) return res.status(409).json({ success: false, message: 'Email already registered' })
    user = {
      id: `user-${Date.now()}`,
      name,
      email,
      password: await bcrypt.hash(password, 10),
      role: 'user',
      preferences: { units: 'metric', theme: 'dark', alerts: true },
      createdAt: new Date(),
    }
    memoryStore.users.push(user)
  }

  memoryStore.apiUsage.auth += 1
  const token = generateToken(user)
  res.cookie('token', token, { httpOnly: true, sameSite: 'lax' })
  success(res, { user: sanitizeUser(user), token }, 'Registration successful', 201)
})

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  let user
  let match

  if (mongoose.connection.readyState === 1) {
    user = await User.findOne({ email }).select('+password')
    match = user ? await user.comparePassword(password) : false
  } else {
    user = memoryStore.users.find((item) => item.email === email)
    match = user ? await bcrypt.compare(password, user.password) : false
  }

  if (!user || !match) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' })
  }

  memoryStore.apiUsage.auth += 1
  const token = generateToken(user)
  res.cookie('token', token, { httpOnly: true, sameSite: 'lax' })
  success(res, { user: sanitizeUser(user), token }, 'Login successful')
})

const logout = asyncHandler(async (req, res) => {
  res.clearCookie('token')
  success(res, null, 'Logged out')
})

const me = asyncHandler(async (req, res) => {
  success(res, { user: sanitizeUser(req.user) }, 'Profile loaded')
})

const forgotPassword = asyncHandler(async (req, res) => {
  await sendPasswordResetEmail({ email: req.body.email })
  success(res, null, 'Password reset instructions sent')
})

const resetPassword = asyncHandler(async (req, res) => {
  success(res, null, 'Password reset endpoint ready')
})

module.exports = { register, login, logout, me, forgotPassword, resetPassword }
