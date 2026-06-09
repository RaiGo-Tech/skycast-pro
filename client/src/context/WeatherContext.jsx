/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useAuth } from '../hooks/useAuth'
import { weatherHistoryService } from '../services/weatherHistoryService'
import { weatherService } from '../services/weatherService'
import {
  DEFAULT_FAVORITES,
  DEMO_WEATHER,
  RECENT_SEARCHES_KEY,
} from '../utils/constants'
import { readStorage, writeStorage } from '../utils/storage'

export const WeatherContext = createContext(null)

export const WeatherProvider = ({ children }) => {
  const { isAuthenticated, loading: authLoading, user } = useAuth()
  const userId = user?.id
  const [weather, setWeather] = useState(DEMO_WEATHER)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [historyLoading, setHistoryLoading] = useState(false)
  const [weatherHistory, setWeatherHistory] = useState([])
  const lastSavedRef = useRef({ key: '', time: 0 })
  const [recentSearches, setRecentSearches] = useState(() =>
    readStorage(RECENT_SEARCHES_KEY, ['Mumbai', 'Delhi', 'Bengaluru']),
  )
  const [favorites, setFavorites] = useState(DEFAULT_FAVORITES)

  const rememberSearch = useCallback(async (data, params = {}) => {
    const city = data?.location?.city || params.city
    if (!city) return

    setRecentSearches((current) => {
      const next = [city, ...current.filter((item) => item.toLowerCase() !== city.toLowerCase())].slice(0, 6)
      writeStorage(RECENT_SEARCHES_KEY, next)
      return next
    })

    if (!isAuthenticated || !userId) return

    const key = `${userId}:${city.toLowerCase()}`
    const now = Date.now()
    if (lastSavedRef.current.key === key && now - lastSavedRef.current.time < 2500) return

    lastSavedRef.current = { key, time: now }

    try {
      const saved = await weatherHistoryService.saveSearch({
        userId,
        weather: data,
        sourceQuery: params.city || city,
      })

      if (saved) {
        setWeatherHistory((current) => [saved, ...current].slice(0, 12))
      }
    } catch (err) {
      console.warn('Could not save weather history', err)
    }
  }, [isAuthenticated, userId])

  const loadHistory = useCallback(async () => {
    if (authLoading) return

    if (!isAuthenticated || !userId) {
      setWeatherHistory([])
      setRecentSearches(readStorage(RECENT_SEARCHES_KEY, ['Mumbai', 'Delhi', 'Bengaluru']))
      return
    }

    setHistoryLoading(true)
    try {
      const rows = await weatherHistoryService.listHistory(12)
      const seen = new Set()
      const cities = rows
        .map((row) => row.cityName)
        .filter((city) => {
          const key = city.toLowerCase()
          if (seen.has(key)) return false
          seen.add(key)
          return true
        })
        .slice(0, 6)

      setWeatherHistory(rows)
      if (cities.length) {
        setRecentSearches(cities)
        writeStorage(RECENT_SEARCHES_KEY, cities)
      }
    } catch (err) {
      console.warn('Could not load weather history', err)
    } finally {
      setHistoryLoading(false)
    }
  }, [authLoading, isAuthenticated, userId])

  const loadWeather = useCallback(
    async (params = { city: 'Mumbai' }) => {
      setLoading(true)
      setError('')
      try {
        const response = await weatherService.current(params)
        setWeather(response.data)
        await rememberSearch(response.data, params)
        return response.data
      } catch (err) {
        setError(err.message)
        setWeather((current) => ({
          ...DEMO_WEATHER,
          location: {
            ...DEMO_WEATHER.location,
            city: params.city || current.location.city,
          },
        }))
        toast.error('Using demo weather because live API is not configured')
        return DEMO_WEATHER
      } finally {
        setLoading(false)
      }
    },
    [rememberSearch],
  )

  const addFavorite = useCallback((city) => {
    setFavorites((current) => {
      const exists = current.some((item) => item.cityName.toLowerCase() === city.cityName.toLowerCase())
      return exists ? current : [city, ...current].slice(0, 8)
    })
  }, [])

  const removeFavorite = useCallback((cityName) => {
    setFavorites((current) => current.filter((item) => item.cityName !== cityName))
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      loadWeather({ city: 'Mumbai' })
    }, 0)
    return () => window.clearTimeout(timer)
  }, [loadWeather])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      loadHistory()
    }, 0)
    return () => window.clearTimeout(timer)
  }, [loadHistory])

  const value = useMemo(
    () => ({
      weather,
      loading,
      error,
      weatherHistory,
      historyLoading,
      recentSearches,
      favorites,
      loadWeather,
      refreshHistory: loadHistory,
      addFavorite,
      removeFavorite,
    }),
    [
      addFavorite,
      error,
      favorites,
      historyLoading,
      loadHistory,
      loadWeather,
      loading,
      recentSearches,
      removeFavorite,
      weather,
      weatherHistory,
    ],
  )

  return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
}
