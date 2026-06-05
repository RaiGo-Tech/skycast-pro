const { signToken } = require('../config/jwt')

const generateToken = (user) =>
  signToken({
    id: user._id || user.id,
    role: user.role || 'user',
  })

module.exports = generateToken
