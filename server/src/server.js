const app = require('./app')
const connectDB = require('./config/db')
const env = require('./config/env')

const startServer = async () => {
  await connectDB()
  app.listen(env.port, () => {
    console.log(`SkyCast Pro API running on http://localhost:${env.port}`)
  })
}

startServer()
