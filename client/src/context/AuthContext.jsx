/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { authService } from '../services/authService'
import { TOKEN_KEY, USER_KEY } from '../utils/constants'
import { readStorage, removeStorage, writeStorage } from '../utils/storage'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => readStorage(USER_KEY))
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY))
  const [loading, setLoading] = useState(false)

  const persistSession = useCallback((payload) => {
    if (payload?.token) {
      localStorage.setItem(TOKEN_KEY, payload.token)
      setToken(payload.token)
    }
    if (payload?.user) {
      writeStorage(USER_KEY, payload.user)
      setUser(payload.user)
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await authService.logout()
    } catch {
      // Local logout should still succeed if the API is unavailable.
    } finally {
      removeStorage(USER_KEY)
      localStorage.removeItem(TOKEN_KEY)
      setToken(null)
      setUser(null)
      toast.success('Logged out')
    }
  }, [])

  const login = useCallback(
    async (payload) => {
      setLoading(true)
      try {
        const response = await authService.login(payload)
        persistSession(response.data)
        toast.success(`Welcome back, ${response.data.user.name}`)
        return response
      } finally {
        setLoading(false)
      }
    },
    [persistSession],
  )

  const register = useCallback(
    async (payload) => {
      setLoading(true)
      try {
        const response = await authService.register(payload)
        persistSession(response.data)
        toast.success('Account created')
        return response
      } finally {
        setLoading(false)
      }
    },
    [persistSession],
  )

  useEffect(() => {
    if (!token) return
    authService
      .me()
      .then((response) => persistSession({ user: response.data.user }))
      .catch(() => {})
  }, [persistSession, token])

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(token && user),
      login,
      register,
      logout,
      setUser,
    }),
    [loading, login, logout, register, token, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
