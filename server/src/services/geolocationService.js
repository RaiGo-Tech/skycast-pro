const { getSuggestions } = require('./weatherAPIService')

const searchLocations = (query) => getSuggestions(query)

module.exports = { searchLocations }
