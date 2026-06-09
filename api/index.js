const app = require('../server/src/app')
const connectDB = require('../server/src/config/db')

let dbPromise

module.exports = async (req, res) => {
  if (!dbPromise) {
    dbPromise = connectDB()
  }

  await dbPromise
  return app(req, res)
}
