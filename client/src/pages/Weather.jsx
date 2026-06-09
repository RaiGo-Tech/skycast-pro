import { useEffect, useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import { FiHeart, FiMessageCircle } from 'react-icons/fi'
import toast from 'react-hot-toast'
import SearchBar from '../components/common/SearchBar'
import AQICard from '../components/weather/AQICard'
import CurrentWeather from '../components/weather/CurrentWeather'
import HourlyForecast from '../components/weather/HourlyForecast'
import SunriseSunset from '../components/weather/SunriseSunset'
import UVIndex from '../components/weather/UVIndex'
import WeatherAlerts from '../components/weather/WeatherAlerts'
import WeatherCard from '../components/weather/WeatherCard'
import WeatherMap from '../components/weather/WeatherMap'
import WeeklyForecast from '../components/weather/WeeklyForecast'
import WindStatus from '../components/weather/WindStatus'
import HumidityChart from '../components/charts/HumidityChart'
import RainfallChart from '../components/charts/RainfallChart'
import WindChart from '../components/charts/WindChart'
import { Card, SectionHeader } from '../components/ui/Card'
import Loader from '../components/common/Loader'
import { Button } from '../components/ui/Button'
import { useWeather } from '../hooks/useWeather'
import { DEMO_WEATHER } from '../utils/constants'

const sectionVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.34, ease: [0.4, 0, 0.2, 1] },
  },
}

const noopAddFavorite = () => {}

const Weather = () => {
  const [params] = useSearchParams()
  const weatherContext = useWeather()
  const weather = weatherContext?.weather || DEMO_WEATHER
  const loading = weatherContext?.loading || false
  const loadWeather = weatherContext?.loadWeather
  const addFavorite = weatherContext?.addFavorite || noopAddFavorite
  const [assistantOpen, setAssistantOpen] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const city = params.get('city')
    if (city && loadWeather) loadWeather({ city })
  }, [loadWeather, params])

  const assistantReply = useMemo(() => {
    const rain = weather.daily[0]?.rainProbability ?? 0
    const wind = weather.current.windSpeed
    if (rain > 50) return 'Carry an umbrella and keep outdoor plans flexible. Rain chances are high today.'
    if (wind > 25) return 'Wind is stronger than usual, so avoid loose rooftop or balcony items.'
    return 'Weather looks manageable. Hydrate well and check alerts before evening travel.'
  }, [weather])

  if (loading && !weather) return <Loader />

  const sectionMotion = reduceMotion
    ? {}
    : {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, amount: 0.12 },
        variants: sectionVariants,
      }

  return (
    <div className="stack-grid">
      <motion.header
        className="weather-toolbar glass-panel grid grid-cols-1 gap-3 rounded-lg border border-white/10 p-4 sm:gap-4 sm:p-5 lg:grid-cols-[minmax(220px,0.7fr)_minmax(0,1.25fr)_auto] lg:items-center"
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="min-w-0 order-2 lg:order-1">
          <p className="text-xs sm:text-sm font-semibold text-cyan-100">Forecast Workspace</p>
          <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">{weather.location.city}</h1>
          <p className="mt-1 truncate text-xs text-white/58">{weather.current.condition}</p>
        </div>
        <div className="order-1 min-w-0 lg:order-2">
          <SearchBar />
        </div>
        <div className="order-3 weather-actions col-span-full flex flex-wrap gap-2 lg:col-span-1 lg:flex-nowrap">
          <Button
            variant="secondary"
            size="md"
            className="flex-1 sm:flex-none"
            aria-label={`Save ${weather.location.city}`}
            onClick={() => {
              addFavorite({
                cityName: weather.location.city,
                country: weather.location.country,
                temp: Math.round(weather.current.temp),
                icon: weather.current.icon,
              })
              toast.success(`${weather.location.city} saved`)
            }}
          >
            <FiHeart aria-hidden="true" className="h-5 w-5" />
            <span className="hidden sm:inline">Save</span>
          </Button>
          <Button
            variant="primary"
            size="md"
            className="flex-1 sm:flex-none"
            aria-label="Toggle weather assistant"
            onClick={() => setAssistantOpen((open) => !open)}
          >
            <FiMessageCircle aria-hidden="true" className="h-5 w-5" />
            <span className="hidden sm:inline">Assistant</span>
          </Button>
        </div>
      </motion.header>

      {assistantOpen ? (
        <Card>
          <SectionHeader title="AI Weather Assistant" subtitle="Demo mode" />
          <p className="text-white/78 text-sm sm:text-base leading-relaxed">{assistantReply}</p>
        </Card>
      ) : null}

      <motion.section className="content-grid gap-3 sm:gap-4 lg:gap-5" {...sectionMotion}>
        <CurrentWeather weather={weather} />
        <HourlyForecast hourly={weather.hourly} />
        <div className="stack-grid gap-3 sm:gap-4">
          <AQICard aqi={weather.aqi} />
          <WeatherAlerts alerts={weather.alerts} />
        </div>
      </motion.section>

      <motion.section className="grid grid-cols-1 gap-3 sm:gap-4 lg:gap-5 xl:grid-cols-[1fr_1fr_0.82fr]" {...sectionMotion}>
        <WeeklyForecast daily={weather.daily} />
        <WeatherMap location={weather.location} />
        <div className="stack-grid gap-3 sm:gap-4">
          <WindStatus current={weather.current} />
          <SunriseSunset current={weather.current} />
          <UVIndex value={weather.current.uvIndex} />
        </div>
      </motion.section>

      <motion.section className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2 lg:gap-5 2xl:grid-cols-3" {...sectionMotion}>
        <Card>
          <SectionHeader title="Humidity Graph" action="Hourly" />
          <HumidityChart data={weather.hourly} />
        </Card>
        <Card>
          <SectionHeader title="Wind Speed Graph" action="Hourly" />
          <WindChart data={weather.hourly} />
        </Card>
        <Card>
          <SectionHeader title="Rain Probability" action="7 days" />
          <RainfallChart data={weather.daily} />
        </Card>
      </motion.section>

      <motion.section className="grid gap-3 sm:gap-4 lg:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" {...sectionMotion}>
        <WeatherCard label="Weekly Rainfall" value={`${weather.analytics.weeklyRainfall} mm`} icon="rain" meta="Up 12% from last week" />
        <WeatherCard label="Avg Temperature" value={`${weather.analytics.averageTemperature} C`} icon="sunny" meta="Stable trend" />
        <WeatherCard label="Max Wind" value={`${weather.analytics.maxWind} km/h`} icon="cloudy" meta="Coastal breeze" />
        <WeatherCard label="Comfort Score" value={`${weather.analytics.comfort}%`} icon="partly-cloudy" meta="Good for travel" />
      </motion.section>

    </div>
  )
}

export default Weather
