import { useContext } from 'react'
import { WeatherContext } from '../context/WeatherContext'

export const useWeather = () => useContext(WeatherContext)
