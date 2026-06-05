const env = require('../config/env')
const { DEMO_WEATHER, buildDemoWeather } = require('./weatherDemoData')

const OPENWEATHER_BASE = 'https://api.openweathermap.org/data/2.5'
const OPENWEATHER_GEO_BASE = 'https://api.openweathermap.org/geo/1.0'
const WEATHERAPI_BASE = 'https://api.weatherapi.com/v1'

const iconFromCondition = (main = '') => {
  const value = main.toLowerCase()
  if (value.includes('clear') || value.includes('sunny')) return 'sunny'
  if (value.includes('partly')) return 'partly-cloudy'
  if (value.includes('cloud') || value.includes('overcast')) return 'cloudy'
  if (value.includes('rain')) return 'rain'
  if (value.includes('drizzle')) return 'drizzle'
  if (value.includes('snow') || value.includes('sleet') || value.includes('ice')) return 'snow'
  if (value.includes('thunder')) return 'thunderstorm'
  if (value.includes('mist') || value.includes('fog') || value.includes('haze')) return 'mist'
  return 'partly-cloudy'
}

const titleCase = (value = 'Weather') =>
  value
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')

const compassFromDegrees = (degrees = 0) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  return directions[Math.round(Number(degrees || 0) / 45) % 8]
}

const requestJSON = async (url) => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Weather provider error: ${response.status}`)
  }
  return response.json()
}

const formatHour = (date) =>
  new Intl.DateTimeFormat('en-IN', { hour: 'numeric' }).format(date)

const formatDate = (date, options) => new Intl.DateTimeFormat('en-IN', options).format(date)

const getWeatherApiQuery = ({ city = 'Mumbai', lat, lon } = {}) =>
  lat && lon ? `${lat},${lon}` : city

const buildWeatherApiHourly = (forecastDays = [], current = {}) => {
  const hours = forecastDays.flatMap((day) => day.hour || [])
  const nowEpoch = current.last_updated_epoch || Math.floor(Date.now() / 1000)
  const upcoming = hours.filter((hour) => hour.time_epoch >= nowEpoch - 3600)
  const selected = (upcoming.length ? upcoming : hours).slice(0, 8)

  return selected.map((hour, index) => ({
    time: index === 0 ? 'Now' : formatHour(new Date(hour.time)),
    temp: Math.round(hour.temp_c),
    humidity: hour.humidity,
    windSpeed: Math.round(hour.wind_kph || 0),
    rainProbability: Number(hour.chance_of_rain || hour.will_it_rain || 0),
    icon: iconFromCondition(hour.condition?.text),
    condition: hour.condition?.text || 'Forecast',
  }))
}

const buildWeatherApiDaily = (forecastDays = []) => {
  const days = forecastDays.slice(0, 7).map((item, index) => {
    const date = new Date(item.date)
    return {
      day: index === 0 ? 'Today' : formatDate(date, { weekday: 'short' }),
      date: formatDate(date, { month: 'short', day: 'numeric' }),
      max: Math.round(item.day?.maxtemp_c || 0),
      min: Math.round(item.day?.mintemp_c || 0),
      rainProbability: Number(item.day?.daily_chance_of_rain || 0),
      icon: iconFromCondition(item.day?.condition?.text),
      condition: item.day?.condition?.text || 'Forecast',
    }
  })

  while (days.length < 7) {
    days.push(DEMO_WEATHER.daily[days.length])
  }
  return days
}

const buildWeatherApiAqi = (airQuality = {}) => {
  const epaIndex = Number(airQuality['us-epa-index'] || 2)
  const labels = ['Good', 'Moderate', 'Unhealthy for Sensitive Groups', 'Unhealthy', 'Very Unhealthy', 'Hazardous']
  const index = Math.round((Number(airQuality.pm2_5 || 22) * 3.1) + epaIndex * 8)

  return {
    index,
    level: labels[epaIndex - 1] || 'Moderate',
    value: epaIndex,
    pm25: Math.round(Number(airQuality.pm2_5 || 22)),
    pm10: Math.round(Number(airQuality.pm10 || 46)),
    o3: Math.round(Number(airQuality.o3 || 58)),
    no2: Math.round(Number(airQuality.no2 || 18)),
    so2: Math.round(Number(airQuality.so2 || 12)),
    co: Number((Number(airQuality.co || 400) / 1000).toFixed(1)),
    recommendation:
      epaIndex <= 2
        ? 'Air quality is acceptable for most outdoor plans.'
        : 'Sensitive people should reduce prolonged outdoor exertion.',
  }
}

const alertTypeFromText = (value = '') => {
  const text = value.toLowerCase()
  if (text.includes('rain') || text.includes('flood')) return 'rain'
  if (text.includes('heat') || text.includes('temperature')) return 'heat'
  if (text.includes('storm') || text.includes('thunder')) return 'storm'
  return 'weather'
}

const buildWeatherApiAlerts = (alerts = [], city = 'Mumbai') => {
  if (!alerts.length) return buildDemoWeather(city).alerts

  return alerts.slice(0, 4).map((alert) => ({
    type: alertTypeFromText(`${alert.event} ${alert.headline} ${alert.desc}`),
    title: alert.event || alert.headline || 'Weather Alert',
    description: alert.desc || alert.headline || 'Check official weather updates before travelling.',
    severity: String(alert.severity || '').toLowerCase().includes('severe') ? 'high' : 'medium',
    time: alert.effective || alert.expires || 'Active now',
  }))
}

const getWeatherApiWeather = async (params) => {
  const query = getWeatherApiQuery(params)
  const url = `${WEATHERAPI_BASE}/forecast.json?key=${env.weatherApiKey}&q=${encodeURIComponent(query)}&days=7&aqi=yes&alerts=yes`
  const data = await requestJSON(url)
  const forecastDays = data.forecast?.forecastday || []
  const current = data.current || {}
  const location = data.location || {}
  const daily = buildWeatherApiDaily(forecastDays)
  const hourly = buildWeatherApiHourly(forecastDays, current)
  const condition = current.condition?.text || 'Weather'

  return {
    location: {
      city: location.name || params.city || 'Current Location',
      country: location.country || '',
      lat: location.lat,
      lon: location.lon,
      localTime: location.localtime || new Date().toISOString(),
    },
    current: {
      temp: Math.round(current.temp_c),
      feelsLike: Math.round(current.feelslike_c),
      condition: titleCase(condition),
      icon: iconFromCondition(condition),
      humidity: current.humidity,
      windSpeed: Math.round(current.wind_kph || 0),
      windDirection: current.wind_dir || compassFromDegrees(current.wind_degree),
      pressure: Math.round(current.pressure_mb || 0),
      uvIndex: Math.round(current.uv || 0),
      visibility: Math.round(current.vis_km || 0),
      sunrise: forecastDays[0]?.astro?.sunrise || DEMO_WEATHER.current.sunrise,
      sunset: forecastDays[0]?.astro?.sunset || DEMO_WEATHER.current.sunset,
    },
    hourly,
    daily,
    aqi: buildWeatherApiAqi(current.air_quality),
    alerts: buildWeatherApiAlerts(data.alerts?.alert || [], location.name || params.city),
    analytics: {
      weeklyRainfall: daily.reduce((sum, day) => sum + day.rainProbability, 0),
      averageTemperature: Number((daily.reduce((sum, day) => sum + day.max + day.min, 0) / (daily.length * 2)).toFixed(1)),
      maxWind: Math.max(...hourly.map((hour) => hour.windSpeed), Math.round(current.wind_kph || 0)),
      comfort: Math.max(40, Math.round(100 - Math.abs((current.temp_c || 27) - 27) * 4 - Math.max(0, (current.humidity || 60) - 60) * 0.4)),
    },
  }
}

const geocodeOpenWeatherCity = async (city) => {
  if (!env.openWeatherApiKey) return null
  const url = `${OPENWEATHER_GEO_BASE}/direct?q=${encodeURIComponent(city)}&limit=1&appid=${env.openWeatherApiKey}`
  const data = await requestJSON(url)
  return data[0] || null
}

const reverseOpenWeatherGeocode = async (lat, lon) => {
  if (!env.openWeatherApiKey) return null
  const url = `${OPENWEATHER_GEO_BASE}/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${env.openWeatherApiKey}`
  const data = await requestJSON(url)
  return data[0] || null
}

const getOpenWeatherCoordinates = async ({ city, lat, lon }) => {
  if (lat && lon) {
    const place = await reverseOpenWeatherGeocode(lat, lon).catch(() => null)
    return {
      city: place?.name || 'Current Location',
      country: place?.country || '',
      lat,
      lon,
    }
  }

  const place = await geocodeOpenWeatherCity(city)
  if (!place) return null
  return {
    city: place.name,
    country: place.country,
    lat: place.lat,
    lon: place.lon,
  }
}

const buildOpenWeatherHourly = (forecastList = []) =>
  forecastList.slice(0, 8).map((item, index) => ({
    time: index === 0 ? 'Now' : formatHour(new Date(item.dt * 1000)),
    temp: Math.round(item.main.temp),
    humidity: item.main.humidity,
    windSpeed: Math.round((item.wind?.speed || 0) * 3.6),
    rainProbability: Math.round((item.pop || 0) * 100),
    icon: iconFromCondition(item.weather?.[0]?.main),
    condition: item.weather?.[0]?.description || 'Forecast',
  }))

const buildOpenWeatherDaily = (forecastList = []) => {
  const grouped = new Map()
  forecastList.forEach((item) => {
    const date = new Date(item.dt * 1000)
    const key = date.toISOString().slice(0, 10)
    const current = grouped.get(key) || {
      temps: [],
      pop: [],
      icon: iconFromCondition(item.weather?.[0]?.main),
      condition: item.weather?.[0]?.description || 'Forecast',
      date,
    }
    current.temps.push(item.main.temp)
    current.pop.push(item.pop || 0)
    grouped.set(key, current)
  })

  const days = Array.from(grouped.values()).slice(0, 7).map((item, index) => ({
    day: index === 0 ? 'Today' : formatDate(item.date, { weekday: 'short' }),
    date: formatDate(item.date, { month: 'short', day: 'numeric' }),
    max: Math.round(Math.max(...item.temps)),
    min: Math.round(Math.min(...item.temps)),
    rainProbability: Math.round((item.pop.reduce((sum, value) => sum + value, 0) / item.pop.length) * 100),
    icon: item.icon,
    condition: item.condition,
  }))

  while (days.length < 7) {
    days.push(DEMO_WEATHER.daily[days.length])
  }
  return days
}

const buildOpenWeatherAqi = (air) => {
  const component = air?.list?.[0]?.components
  const value = air?.list?.[0]?.main?.aqi || 2
  const labels = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor']
  return {
    index: Math.round((component?.pm2_5 || 22) * 3.1),
    level: labels[value - 1] || 'Moderate',
    value,
    pm25: Math.round(component?.pm2_5 || 22),
    pm10: Math.round(component?.pm10 || 46),
    o3: Math.round(component?.o3 || 58),
    no2: Math.round(component?.no2 || 18),
    so2: Math.round(component?.so2 || 12),
    co: Number(((component?.co || 400) / 1000).toFixed(1)),
    recommendation:
      value <= 2
        ? 'Air quality is healthy for most outdoor plans.'
        : 'Air quality is acceptable. Sensitive people should reduce prolonged outdoor exertion.',
  }
}

const getOpenWeatherWeather = async ({ city = 'Mumbai', lat, lon } = {}) => {
  const location = await getOpenWeatherCoordinates({ city, lat, lon })
  if (!location) return buildDemoWeather(city)

  const params = `lat=${location.lat}&lon=${location.lon}&appid=${env.openWeatherApiKey}&units=metric`
  const [current, forecast, air] = await Promise.all([
    requestJSON(`${OPENWEATHER_BASE}/weather?${params}`),
    requestJSON(`${OPENWEATHER_BASE}/forecast?${params}`),
    requestJSON(`${OPENWEATHER_BASE}/air_pollution?${params}`).catch(() => null),
  ])

  const sunrise = new Date(current.sys.sunrise * 1000)
  const sunset = new Date(current.sys.sunset * 1000)
  const daily = buildOpenWeatherDaily(forecast.list || [])
  const hourly = buildOpenWeatherHourly(forecast.list || [])
  const condition = current.weather?.[0]?.description || 'Weather'

  return {
    location: {
      city: location.city,
      country: location.country,
      lat: location.lat,
      lon: location.lon,
      localTime: new Date().toISOString(),
    },
    current: {
      temp: Math.round(current.main.temp),
      feelsLike: Math.round(current.main.feels_like),
      condition: titleCase(condition),
      icon: iconFromCondition(current.weather?.[0]?.main),
      humidity: current.main.humidity,
      windSpeed: Math.round((current.wind?.speed || 0) * 3.6),
      windDirection: compassFromDegrees(current.wind?.deg),
      pressure: current.main.pressure,
      uvIndex: 4,
      visibility: Math.round((current.visibility || 10000) / 1000),
      sunrise: formatDate(sunrise, { hour: '2-digit', minute: '2-digit' }),
      sunset: formatDate(sunset, { hour: '2-digit', minute: '2-digit' }),
    },
    hourly,
    daily,
    aqi: buildOpenWeatherAqi(air),
    alerts: buildDemoWeather(location.city).alerts,
    analytics: {
      weeklyRainfall: daily.reduce((sum, day) => sum + day.rainProbability, 0),
      averageTemperature: Number((daily.reduce((sum, day) => sum + day.max + day.min, 0) / (daily.length * 2)).toFixed(1)),
      maxWind: Math.max(...hourly.map((hour) => hour.windSpeed), Math.round((current.wind?.speed || 0) * 3.6)),
      comfort: Math.max(40, Math.round(100 - Math.abs(current.main.temp - 27) * 4 - Math.max(0, current.main.humidity - 60) * 0.4)),
    },
  }
}

const getWeather = async (params = { city: 'Mumbai' }) => {
  if (env.weatherApiKey) {
    return getWeatherApiWeather(params)
  }

  if (env.openWeatherApiKey) {
    return getOpenWeatherWeather(params)
  }

  return buildDemoWeather(params.city || 'Mumbai')
}

const getWeatherApiSuggestions = async (query = '') => {
  const url = `${WEATHERAPI_BASE}/search.json?key=${env.weatherApiKey}&q=${encodeURIComponent(query)}`
  const data = await requestJSON(url)
  return data.slice(0, 5).map((item) => ({
    city: item.name,
    country: item.country,
    lat: item.lat,
    lon: item.lon,
  }))
}

const getOpenWeatherSuggestions = async (query = '') => {
  const url = `${OPENWEATHER_GEO_BASE}/direct?q=${encodeURIComponent(query)}&limit=5&appid=${env.openWeatherApiKey}`
  const data = await requestJSON(url)
  return data.map((item) => ({
    city: item.name,
    country: item.country,
    lat: item.lat,
    lon: item.lon,
  }))
}

const getSuggestions = async (query = '') => {
  if (query.length < 2) return []
  if (env.weatherApiKey) return getWeatherApiSuggestions(query)
  if (env.openWeatherApiKey) return getOpenWeatherSuggestions(query)
  return []
}

module.exports = { getWeather, getSuggestions }
