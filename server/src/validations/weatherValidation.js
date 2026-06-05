const cityOrCoords = (query) => {
  const city = String(query.city || query.q || '').trim()
  const lat = query.lat !== undefined ? Number(query.lat) : undefined
  const lon = query.lon !== undefined ? Number(query.lon) : undefined

  if (city.length >= 2) return { city }
  if (Number.isFinite(lat) && Number.isFinite(lon)) return { lat, lon }
  return { city: 'Mumbai' }
}

module.exports = { cityOrCoords }
