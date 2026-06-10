import { requireSupabase, isSupabaseConfigured } from './supabaseClient'

const TABLE_NAME = 'profiles'

const selectColumns = 'id, email, full_name, avatar_url, role, preferences, metadata, created_at, updated_at'

const normalizeProfile = (row) => ({
  id: row.id,
  email: row.email,
  fullName: row.full_name,
  name: row.full_name,
  avatarUrl: row.avatar_url,
  role: row.role,
  preferences: row.preferences || {},
  metadata: row.metadata || {},
  createdAt: row.created_at,
  updatedAt: row.updated_at,
})

const apiResponse = (data) => ({ success: true, data })

export const profileService = {
  // Get current user profile
  getProfile: async (userId) => {
    if (!isSupabaseConfigured || !userId) return null

    const client = requireSupabase()
    const { data, error } = await client
      .from(TABLE_NAME)
      .select(selectColumns)
      .eq('id', userId)
      .single()

    if (error) throw error

    return normalizeProfile(data)
  },

  // Update user profile
  updateProfile: async (userId, updates) => {
    if (!isSupabaseConfigured || !userId) return null

    const client = requireSupabase()
    
    const row = {}
    if (updates.fullName !== undefined) row.full_name = updates.fullName
    if (updates.avatarUrl !== undefined) row.avatar_url = updates.avatarUrl
    if (updates.preferences !== undefined) row.preferences = updates.preferences
    if (updates.metadata !== undefined) row.metadata = updates.metadata

    const { data, error } = await client
      .from(TABLE_NAME)
      .update(row)
      .eq('id', userId)
      .select(selectColumns)
      .single()

    if (error) throw error

    return normalizeProfile(data)
  },

  // Update user preferences
  updatePreferences: async (userId, preferences) => {
    if (!isSupabaseConfigured || !userId) return null

    const client = requireSupabase()

    const { data, error } = await client
      .from(TABLE_NAME)
      .update({ preferences })
      .eq('id', userId)
      .select(selectColumns)
      .single()

    if (error) throw error

    return normalizeProfile(data)
  },

  // Update user avatar
  updateAvatar: async (userId, avatarUrl) => {
    if (!isSupabaseConfigured || !userId) return null

    const client = requireSupabase()

    const { data, error } = await client
      .from(TABLE_NAME)
      .update({ avatar_url: avatarUrl })
      .eq('id', userId)
      .select(selectColumns)
      .single()

    if (error) throw error

    return normalizeProfile(data)
  },

  // Delete user account
  deleteAccount: async (userId) => {
    if (!isSupabaseConfigured || !userId) return null

    const client = requireSupabase()

    // Delete profile (cascade will handle related records)
    const { error } = await client
      .from(TABLE_NAME)
      .delete()
      .eq('id', userId)

    if (error) throw error

    return apiResponse({ success: true })
  },
}
