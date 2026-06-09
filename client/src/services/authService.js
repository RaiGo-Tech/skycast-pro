import { requireSupabase, supabase } from './supabaseClient'

const profileFromUser = (user) => {
  if (!user) return null

  const metadata = user.user_metadata || {}
  const name = metadata.name || metadata.full_name || user.email?.split('@')[0] || 'SkyCast User'

  return {
    id: user.id,
    name,
    email: user.email,
    role: metadata.role || 'student',
    avatarUrl: metadata.avatar_url || null,
    createdAt: user.created_at,
  }
}

const sessionPayload = (session, fallbackUser = null) => ({
  token: session?.access_token || null,
  refreshToken: session?.refresh_token || null,
  user: profileFromUser(session?.user || fallbackUser),
  session: session || null,
})

const apiResponse = (data) => ({ success: true, data })
const authRedirectTo = () => `${window.location.origin}/dashboard`

export const authService = {
  register: async ({ name, email, password }) => {
    const client = requireSupabase()
    const { data, error } = await client.auth.signUp({
      email,
      password,
      options: {
        data: { name, role: 'student' },
        emailRedirectTo: authRedirectTo(),
      },
    })

    if (error) throw error

    return apiResponse({
      ...sessionPayload(data.session, data.user),
      requiresEmailConfirmation: Boolean(data.user && !data.session),
    })
  },

  login: async ({ email, password }) => {
    const client = requireSupabase()
    const { data, error } = await client.auth.signInWithPassword({ email, password })

    if (error) throw error

    return apiResponse(sessionPayload(data.session, data.user))
  },

  signInWithProvider: async (provider) => {
    const client = requireSupabase()
    const { data, error } = await client.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: authRedirectTo(),
      },
    })

    if (error) throw error

    return apiResponse(data)
  },

  sendMagicLink: async ({ email, name }) => {
    const client = requireSupabase()
    const { data, error } = await client.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: authRedirectTo(),
        data: {
          name: name || email.split('@')[0],
          role: 'student',
        },
      },
    })

    if (error) throw error

    return apiResponse(data)
  },

  logout: async () => {
    if (!supabase) return apiResponse(null)

    const { error } = await supabase.auth.signOut()
    if (error) throw error

    return apiResponse(null)
  },

  me: async () => {
    const client = requireSupabase()
    const { data, error } = await client.auth.getUser()

    if (error) throw error

    return apiResponse({ user: profileFromUser(data.user) })
  },

  resetPassword: async (email) => {
    const client = requireSupabase()
    const { error } = await client.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    })

    if (error) throw error

    return apiResponse(null)
  },

  getSession: async () => {
    const client = requireSupabase()
    const { data, error } = await client.auth.getSession()

    if (error) throw error

    return apiResponse(sessionPayload(data.session))
  },

  onAuthStateChange: (callback) => {
    if (!supabase) return { unsubscribe: () => {} }

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      callback({ event, data: sessionPayload(session) })
    })

    return data.subscription
  },
}
