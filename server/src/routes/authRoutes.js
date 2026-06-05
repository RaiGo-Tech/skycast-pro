const express = require('express')
const {
  forgotPassword,
  login,
  logout,
  me,
  register,
  resetPassword,
} = require('../controllers/authController')
const { protect } = require('../middleware/authMiddleware')
const validate = require('../middleware/validationMiddleware')
const { loginSchema, registerSchema } = require('../validations/authValidation')
const { authLimiter } = require('../middleware/rateLimiter')

const router = express.Router()

router.post('/register', authLimiter, validate(registerSchema), register)
router.post('/login', authLimiter, validate(loginSchema), login)
router.post('/logout', logout)
router.get('/me', protect, me)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)

module.exports = router
