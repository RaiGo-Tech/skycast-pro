import {
  WiCloud,
  WiDaySunny,
  WiDayCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
  WiNightClear,
} from 'react-icons/wi'

export const weatherIconMap = {
  sunny: WiDaySunny,
  clear: WiDaySunny,
  'partly-cloudy': WiDayCloudy,
  cloudy: WiCloud,
  rain: WiRain,
  drizzle: WiRain,
  snow: WiSnow,
  thunderstorm: WiThunderstorm,
  mist: WiFog,
  fog: WiFog,
  night: WiNightClear,
}

export const getWeatherIcon = (icon = 'partly-cloudy') => weatherIconMap[icon] || WiDayCloudy

export const formatTemp = (value) => `${Math.round(Number(value) || 0)}°C`

export const aqiTone = (level = '') => {
  const normalized = level.toLowerCase()
  if (normalized.includes('good')) return 'text-emerald-200'
  if (normalized.includes('moderate')) return 'text-amber-200'
  return 'text-red-200'
}

export const getAqiPercent = (index = 0) => Math.min(100, Math.max(0, (Number(index) / 300) * 100))

export const getWeatherMood = (condition = '') => {
  const lower = condition.toLowerCase()
  if (lower.includes('rain')) return 'Rain-ready'
  if (lower.includes('storm')) return 'Storm watch'
  if (lower.includes('clear') || lower.includes('sun')) return 'Bright'
  return 'Balanced'
}
