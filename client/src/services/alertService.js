import { requireSupabase, isSupabaseConfigured } from './supabaseClient'

const TABLE_NAME = 'weather_alerts'

const selectColumns = 'id, user_id, city_name, country, alert_type, condition, is_active, notification_sent, created_at, updated_at'

const normalizeAlert = (row) => ({
  id: row.id,
  userId: row.user_id,
  cityName: row.city_name,
  country: row.country || '',
  alertType: row.alert_type,
  condition: row.condition || {},
  isActive: row.is_active,
  notificationSent: row.notification_sent,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
})

const apiResponse = (data) => ({ success: true, data })

export const alertService = {
  // Create a new weather alert
  createAlert: async ({ userId, cityName, country, alertType, condition }) => {
    if (!isSupabaseConfigured || !userId || !cityName || !alertType) return null

    const client = requireSupabase()
    
    const row = {
      user_id: userId,
      city_name: cityName,
      country: country || '',
      alert_type: alertType,
      condition: condition || {},
      is_active: true,
      notification_sent: false,
    }

    const { data, error } = await client
      .from(TABLE_NAME)
      .insert(row)
      .select(selectColumns)
      .single()

    if (error) throw error

    return normalizeAlert(data)
  },

  // Get all alerts for a user
  getAlerts: async (userId, activeOnly = true) => {
    if (!isSupabaseConfigured || !userId) return []

    const client = requireSupabase()
    
    let query = client
      .from(TABLE_NAME)
      .select(selectColumns)
      .eq('user_id', userId)

    if (activeOnly) {
      query = query.eq('is_active', true)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) throw error

    return (data || []).map(normalizeAlert)
  },

  // Get alerts for a specific city
  getCityAlerts: async (userId, cityName) => {
    if (!isSupabaseConfigured || !userId || !cityName) return []

    const client = requireSupabase()
    
    const { data, error } = await client
      .from(TABLE_NAME)
      .select(selectColumns)
      .eq('user_id', userId)
      .eq('city_name', cityName)
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) throw error

    return (data || []).map(normalizeAlert)
  },

  // Update an alert
  updateAlert: async (alertId, updates) => {
    if (!isSupabaseConfigured || !alertId) return null

    const client = requireSupabase()
    
    const row = {}
    if (updates.condition !== undefined) row.condition = updates.condition
    if (updates.isActive !== undefined) row.is_active = updates.isActive
    if (updates.notificationSent !== undefined) row.notification_sent = updates.notificationSent

    const { data, error } = await client
      .from(TABLE_NAME)
      .update(row)
      .eq('id', alertId)
      .select(selectColumns)
      .single()

    if (error) throw error

    return normalizeAlert(data)
  },

  // Deactivate an alert
  deactivateAlert: async (alertId) => {
    if (!isSupabaseConfigured || !alertId) return null

    const client = requireSupabase()

    const { data, error } = await client
      .from(TABLE_NAME)
      .update({ is_active: false })
      .eq('id', alertId)
      .select(selectColumns)
      .single()

    if (error) throw error

    return normalizeAlert(data)
  },

  // Delete an alert
  deleteAlert: async (alertId) => {
    if (!isSupabaseConfigured || !alertId) return null

    const client = requireSupabase()

    const { error } = await client
      .from(TABLE_NAME)
      .delete()
      .eq('id', alertId)

    if (error) throw error

    return apiResponse({ success: true })
  },

  // Mark notification as sent
  markNotificationSent: async (alertId) => {
    if (!isSupabaseConfigured || !alertId) return null

    const client = requireSupabase()

    const { data, error } = await client
      .from(TABLE_NAME)
      .update({ notification_sent: true })
      .eq('id', alertId)
      .select(selectColumns)
      .single()

    if (error) throw error

    return normalizeAlert(data)
  },
}
