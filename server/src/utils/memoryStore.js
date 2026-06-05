const bcrypt = require('bcryptjs')

const demoUser = {
  id: 'demo-user',
  name: 'SkyCast Student',
  email: 'demo@skycast.dev',
  password: bcrypt.hashSync('demo123', 10),
  role: 'admin',
  preferences: { units: 'metric', theme: 'dark', alerts: true },
  favoriteCities: [
    { cityName: 'Mumbai', country: 'IN', latitude: 19.076, longitude: 72.8777 },
    { cityName: 'Delhi', country: 'IN', latitude: 28.6139, longitude: 77.209 },
  ],
  searchHistory: [],
  createdAt: new Date(),
}

const memoryStore = {
  users: [demoUser],
  favorites: [...demoUser.favoriteCities.map((city) => ({ ...city, userId: demoUser.id }))],
  history: [],
  apiUsage: { weather: 0, auth: 0 },
}

module.exports = memoryStore
