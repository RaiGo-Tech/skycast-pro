import { requireSupabase, isSupabaseConfigured } from './supabaseClient'

const TABLE_NAME = 'favorite_cities'

const selectColumns = 'id, user_id, city_name, country, latitude, longitude, timezone, weather_summary, is_default, display_order, created_at, updated_at'

const normalizeFavorite = (row) => ({
  id: row.id,
  userId: row.user_id,
  cityName: row.city_name,
  country: row.country || '',
  latitude: row.latitude,
  longitude: row.longitude,
  timezone: row.timezone,
  weatherSummary: row.weather_summary || {},
  isDefault: row.is_default,
  displayOrder: row.display_order,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
})

const apiResponse = (data) => ({ success: true, data })

export const favoriteService = {
  // Add a city to favorites
  addFavorite: async ({ userId, cityName, country, latitude, longitude, timezone, weatherSummary }) => {
    if (!isSupabaseConfigured || !userId || !cityName) return null

    const client = requireSupabase()
    
    // Get current max display order for this user
    const { data: existingFavorites } = await client
      .from(TABLE_NAME)
      .select('display_order')
      .eq('user_id', userId)
      .order('display_order', { ascending: false })
      .limit(1)

    const nextDisplayOrder = existingFavorites && existingFavorites.length > 0 
      ? (existingFavorites[0].display_order + 1) 
      : 0

    const row = {
      user_id: userId,
      city_name: cityName,
      country: country || '',
      latitude,
      longitude,
      timezone,
      weather_summary: weatherSummary || {},
      is_default: false,
      display_order: nextDisplayOrder,
    }

    const { data, error } = await client
      .from(TABLE_NAME)
      .insert(row)
      .select(selectColumns)
      .single()

    if (error) throw error

    return normalizeFavorite(data)
  },

  // Get all favorites for a user
  getFavorites: async (userId) => {
    if (!isSupabaseConfigured || !userId) return []

    const client = requireSupabase()
    const { data, error } = await client
      .from(TABLE_NAME)
      .select(selectColumns)
      .eq('user_id', userId)
      .order('is_default', { ascending: false })
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) throw error

    return (data || []).map(normalizeFavorite)
  },

  // Remove a favorite
  removeFavorite: async (userId, cityName) => {
    if (!isSupabaseConfigured || !userId || !cityName) return null

    const client = requireSupabase()
    const { error } = await client
      .from(TABLE_NAME)
      .delete()
      .eq('user_id', userId)
      .eq('city_name', cityName)

    if (error) throw error

    return apiResponse({ success: true })
  },

  // Update favorite weather summary
  updateFavoriteWeather: async (userId, cityName, weatherSummary) => {
    if (!isSupabaseConfigured || !userId || !cityName) return null

    const client = requireSupabase()
    const { data, error } = await client
      .from(TABLE_NAME)
      .update({ weather_summary: weatherSummary })
      .eq('user_id', userId)
      .eq('city_name', cityName)
      .select(selectColumns)
      .single()

    if (error) throw error

    return normalizeFavorite(data)
  },

  // Set default favorite city
  setDefaultFavorite: async (userId, cityName) => {
    if (!isSupabaseConfigured || !userId || !cityName) return null

    const client = requireSupabase()

    // First, remove default status from all favorites for this user
    await client
      .from(TABLE_NAME)
      .update({ is_default: false })
      .eq('user_id', userId)

    // Then set the new default
    const { data, error } = await client
      .from(TABLE_NAME)
      .update({ is_default: true })
      .eq('user_id', userId)
      .eq('city_name', cityName)
      .select(selectColumns)
      .single()

    if (error) throw error

    return normalizeFavorite(data)
  },

  // Reorder favorites
  reorderFavorites: async (userId, favorites) => {
    if (!isSupabaseConfigured || !userId || !favorites) return null

    const client = requireSupabase()

    // Update display order for each favorite
    const updates = favorites.map((fav, index) => 
      client
        .from(TABLE_NAME)
        .update({ display_order: index })
        .eq('id', fav.id)
    )

    await Promise.all(updates)

    return apiResponse({ success: true })
  },

  // Check if a city is already a favorite
  isFavorite: async (userId, cityName) => {
    if (!isSupabaseConfigured || !userId || !cityName) return false

    const client = requireSupabase()
    const { data, error } = await client
      .from(TABLE_NAME)
      .select('id')
      .eq('user_id', userId)
      .eq('city_name', cityName)
      .single()

    if (error) return false

    return !!data
  },
}
