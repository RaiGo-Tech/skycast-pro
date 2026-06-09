/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { authService } from '../services/authService'
import { isSupabaseConfigured } from '../services/supabaseClient'
import { TOKEN_KEY, USER_KEY } from '../utils/constants'
import { readStorage, removeStorage, writeStorage } from '../utils/storage'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => readStorage(USER_KEY))
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY))
  const [loading, setLoading] = useState(true)
  const [authAction, setAuthAction] = useState('')

  const clearSession = useCallback(() => {
    removeStorage(USER_KEY)
    localStorage.removeItem(TOKEN_KEY)
    setToken(null)
    setUser(null)
  }, [])

  const persistSession = useCallback((payload) => {
    if (!payload?.token || !payload?.user) return

    localStorage.setItem(TOKEN_KEY, payload.token)
    setToken(payload.token)
    writeStorage(USER_KEY, payload.user)
    setUser(payload.user)
  }, [])

  const logout = useCallback(async () => {
    setLoading(true)
    try {
      await authService.logout()
    } catch {
      // Local logout should still succeed if the API is unavailable.
    } finally {
      clearSession()
      setLoading(false)
      toast.success('Logged out')
    }
  }, [clearSession])

  const login = useCallback(
    async (payload) => {
      setLoading(true)
      setAuthAction('email-login')
      try {
        const response = await authService.login(payload)
        persistSession(response.data)
        toast.success(`Welcome back, ${response.data.user.name}`)
        return response
      } finally {
        setAuthAction('')
        setLoading(false)
      }
    },
    [persistSession],
  )

  const register = useCallback(
    async (payload) => {
      setLoading(true)
      setAuthAction('email-register')
      try {
        const response = await authService.register(payload)
        if (response.data.token) {
          persistSession(response.data)
          toast.success('Account created')
        } else {
          toast.success('Account created. Check your email to confirm it, then login.')
        }
        return response
      } finally {
        setAuthAction('')
        setLoading(false)
      }
    },
    [persistSession],
  )

  const signInWithProvider = useCallback(async (provider) => {
    setLoading(true)
    setAuthAction(provider)
    try {
      const response = await authService.signInWithProvider(provider)
      return response
    } finally {
      setAuthAction('')
      setLoading(false)
    }
  }, [])

  const sendMagicLink = useCallback(async (payload) => {
    setLoading(true)
    setAuthAction('magic-link')
    try {
      const response = await authService.sendMagicLink(payload)
      toast.success('Magic login link sent to your email')
      return response
    } finally {
      setAuthAction('')
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let mounted = true

    if (!isSupabaseConfigured) {
      window.queueMicrotask(() => {
        if (!mounted) return
        clearSession()
        setLoading(false)
      })
      return undefined
    }

    authService
      .getSession()
      .then((response) => {
        if (!mounted) return

        if (response.data.token) {
          persistSession(response.data)
        } else {
          clearSession()
        }
      })
      .catch(() => {
        if (mounted) clearSession()
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    const subscription = authService.onAuthStateChange(({ event, data }) => {
      if (!mounted) return

      if (event === 'SIGNED_OUT' || !data?.token) {
        clearSession()
        return
      }

      persistSession(data)
    })

    return () => {
      mounted = false
      subscription?.unsubscribe?.()
    }
  }, [clearSession, persistSession])

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      authAction,
      isSupabaseConfigured,
      isAuthenticated: Boolean(token && user),
      login,
      register,
      signInWithProvider,
      sendMagicLink,
      logout,
      setUser,
    }),
    [authAction, loading, login, logout, register, sendMagicLink, signInWithProvider, token, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
