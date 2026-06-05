/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { weatherService } from '../services/weatherService'
import {
  DEFAULT_FAVORITES,
  DEMO_WEATHER,
  RECENT_SEARCHES_KEY,
} from '../utils/constants'
import { readStorage, writeStorage } from '../utils/storage'

export const WeatherContext = createContext(null)

export const WeatherProvider = ({ children }) => {
  const [weather, setWeather] = useState(DEMO_WEATHER)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [recentSearches, setRecentSearches] = useState(() =>
    readStorage(RECENT_SEARCHES_KEY, ['Mumbai', 'Delhi', 'Bengaluru']),
  )
  const [favorites, setFavorites] = useState(DEFAULT_FAVORITES)

  const rememberSearch = useCallback((city) => {
    if (!city) return
    setRecentSearches((current) => {
      const next = [city, ...current.filter((item) => item.toLowerCase() !== city.toLowerCase())].slice(0, 6)
      writeStorage(RECENT_SEARCHES_KEY, next)
      return next
    })
  }, [])

  const loadWeather = useCallback(
    async (params = { city: 'Mumbai' }) => {
      setLoading(true)
      setError('')
      try {
        const response = await weatherService.current(params)
        setWeather(response.data)
        rememberSearch(response.data.location.city)
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

  const value = useMemo(
    () => ({
      weather,
      loading,
      error,
      recentSearches,
      favorites,
      loadWeather,
      addFavorite,
      removeFavorite,
    }),
    [addFavorite, error, favorites, loadWeather, loading, recentSearches, removeFavorite, weather],
  )

  return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
}
