const jwt = require('jsonwebtoken')
const env = require('./env')

const signToken = (payload) => jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn })

const verifyToken = (token) => jwt.verify(token, env.jwtSecret)

module.exports = { signToken, verifyToken }
