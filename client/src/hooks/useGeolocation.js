import { useState } from 'react'
import { getBrowserLocation } from '../services/locationService'

export const useGeolocation = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const getLocation = async () => {
    setLoading(true)
    setError('')
    try {
      return await getBrowserLocation()
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { getLocation, loading, error }
}
