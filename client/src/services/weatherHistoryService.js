import { isSupabaseConfigured, requireSupabase } from './supabaseClient'

const TABLE_NAME = 'weather_search_history'

const selectColumns =
  'id,searched_city,country,source_query,weather_summary,weather_payload,searched_at,created_at'

const weatherSummary = (weather) => ({
  temp: weather?.current?.temp ?? null,
  feelsLike: weather?.current?.feelsLike ?? null,
  condition: weather?.current?.condition || '',
  icon: weather?.current?.icon || '',
  humidity: weather?.current?.humidity ?? null,
  windSpeed: weather?.current?.windSpeed ?? null,
})

const normalizeHistoryRow = (row) => ({
  id: row.id,
  cityName: row.searched_city,
  searchedCity: row.searched_city,
  country: row.country || '',
  sourceQuery: row.source_query || '',
  weatherSummary: row.weather_summary || {},
  weather: row.weather_payload || null,
  searchedAt: row.searched_at,
  createdAt: row.created_at,
})

export const weatherHistoryService = {
  saveSearch: async ({ userId, weather, sourceQuery }) => {
    if (!isSupabaseConfigured || !userId || !weather?.location?.city) return null

    const client = requireSupabase()
    const row = {
      user_id: userId,
      searched_city: weather.location.city,
      country: weather.location.country || '',
      source_query: sourceQuery || weather.location.city,
      weather_summary: weatherSummary(weather),
      weather_payload: weather,
      searched_at: new Date().toISOString(),
    }

    const { data, error } = await client.from(TABLE_NAME).insert(row).select(selectColumns).single()

    if (error) throw error

    return normalizeHistoryRow(data)
  },

  listHistory: async (limit = 12) => {
    if (!isSupabaseConfigured) return []

    const client = requireSupabase()
    const { data, error } = await client
      .from(TABLE_NAME)
      .select(selectColumns)
      .order('searched_at', { ascending: false })
      .limit(limit)

    if (error) throw error

    return (data || []).map(normalizeHistoryRow)
  },

  listRecentCities: async (limit = 6) => {
    const rows = await weatherHistoryService.listHistory(Math.max(limit * 3, 12))
    const seen = new Set()

    return rows
      .map((row) => row.cityName)
      .filter((city) => {
        const key = city.toLowerCase()
        if (seen.has(key)) return false
        seen.add(key)
        return true
      })
      .slice(0, limit)
  },
}
