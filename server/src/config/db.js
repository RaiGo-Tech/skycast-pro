const mongoose = require('mongoose')
const env = require('./env')

const connectDB = async () => {
  if (!env.mongoUri) {
    console.log('MongoDB URI not provided. SkyCast Pro is running with in-memory demo storage.')
    return null
  }

  try {
    const connection = await mongoose.connect(env.mongoUri)
    console.log(`MongoDB connected: ${connection.connection.host}`)
    return connection
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`)
    console.log('Continuing with in-memory demo storage.')
    return null
  }
}

module.exports = connectDB
