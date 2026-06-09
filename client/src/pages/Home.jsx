import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FiBell,
  FiClock,
  FiCloudLightning,
  FiDroplet,
  FiMapPin,
  FiShield,
  FiSun,
  FiTrendingUp,
  FiWind,
} from 'react-icons/fi'
import SearchBar from '../components/common/SearchBar'
import { Card, SectionHeader } from '../components/ui/Card'
import CurrentWeather from '../components/weather/CurrentWeather'
import WeatherIcon from '../components/weather/WeatherIcon'
import { useWeather } from '../hooks/useWeather'
import { DEMO_WEATHER } from '../utils/constants'
import { formatLocalDate, formatShortTime } from '../utils/formatDate'

const featureCards = [
  { icon: FiCloudLightning, title: 'Live forecast workspace', text: 'Current weather, hourly detail, weekly planning, AQI, alerts, and charts stay in one focused surface.' },
  { icon: FiShield, title: 'Account-ready history', text: 'Authenticated users keep their searched places in Supabase-backed weather history.' },
  { icon: FiTrendingUp, title: 'Readable insight panels', text: 'Comfort, wind, rainfall, and air-quality cards are tuned for quick decisions.' },
]

const statItems = [
  { label: 'Hourly forecast', value: '8 slots', icon: FiClock },
  { label: 'AQI context', value: 'Health tips', icon: FiDroplet },
  { label: 'Weather alerts', value: 'Live-ready', icon: FiBell },
  { label: 'Wind detail', value: 'km/h', icon: FiWind },
]

const Home = () => {
  const weatherContext = useWeather()
  const favorites = weatherContext?.favorites || []
  const recentSearches = weatherContext?.recentSearches || []
  const weather = weatherContext?.weather || DEMO_WEATHER
  const weatherHistory = weatherContext?.weatherHistory || []
  const reduceMotion = useReducedMotion()
  const latestHistory = weatherHistory.slice(0, 3)
  const suggestionCities = latestHistory.length
    ? latestHistory.map((item) => item.cityName)
    : recentSearches.slice(0, 3)

  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.18 },
        transition: { duration: 0.36, ease: [0.4, 0, 0.2, 1] },
      }

  return (
    <div className="stack-grid gap-8 sm:gap-10 lg:gap-12">
      <section className="hero-shell">
        <div className="hero-content">
          <motion.div
            className="max-w-4xl"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.42, ease: [0.4, 0, 0.2, 1] }}
          >
            <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl lg:text-7xl">
              SkyCast Pro
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/74 sm:text-lg">
              A polished weather workspace for searching places, reading live conditions, saving history, and planning the next few hours with confidence.
            </p>
          </motion.div>

          <motion.div
            className="hero-search-wrap"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.08, ease: [0.4, 0, 0.2, 1] }}
          >
            <SearchBar />
          </motion.div>

          <motion.div
            className="hero-status-grid"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.14, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="hero-weather-strip">
              <WeatherIcon icon={weather.current.icon} className="h-14 w-14 flex-none text-amber-200" aria-hidden="true" />
              <div className="min-w-0">
                <p className="flex items-center gap-2 text-sm font-semibold text-white/72">
                  <FiMapPin aria-hidden="true" />
                  <span className="truncate">{weather.location.city}, {weather.location.country}</span>
                </p>
                <p className="mt-1 text-3xl font-black text-white">{Math.round(weather.current.temp)} C</p>
                <p className="text-sm text-white/62">{weather.current.condition}</p>
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-3">
              <div className="hero-mini-stat">
                <FiSun aria-hidden="true" />
                <span>Feels {Math.round(weather.current.feelsLike)} C</span>
              </div>
              <div className="hero-mini-stat">
                <FiDroplet aria-hidden="true" />
                <span>{weather.current.humidity}% humidity</span>
              </div>
              <div className="hero-mini-stat">
                <FiWind aria-hidden="true" />
                <span>{weather.current.windSpeed} km/h wind</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <motion.section className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]" {...reveal}>
        <CurrentWeather weather={weather} />

        <div className="grid gap-4">
          <Card>
            <SectionHeader title="Recent Suggestions" action="History" />
            <div className="grid gap-2">
              {suggestionCities.map((city) => (
                <Link
                  key={city}
                  to={`/weather?city=${encodeURIComponent(city)}`}
                  className="flex items-center justify-between rounded-lg bg-white/9 px-3 py-3 text-sm text-white transition hover:bg-white/16"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <FiClock className="flex-none text-cyan-100" aria-hidden="true" />
                    <span className="truncate">{city}</span>
                  </span>
                  <span className="text-xs font-semibold text-white/54">Open</span>
                </Link>
              ))}
            </div>
          </Card>

          <Card>
            <SectionHeader title="Favorite Cities" action={`${favorites.length} saved`} />
            <div className="grid gap-2">
              {favorites.slice(0, 3).map((city) => (
                <Link
                  key={city.cityName}
                  to={`/weather?city=${encodeURIComponent(city.cityName)}`}
                  className="flex items-center justify-between rounded-lg bg-white/9 px-3 py-3 text-sm text-white transition hover:bg-white/16"
                >
                  <span className="truncate font-semibold">{city.cityName}</span>
                  <span className="flex-none text-cyan-100">{city.temp} C</span>
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </motion.section>

      <motion.section className="grid gap-4 md:grid-cols-3" {...reveal}>
        {featureCards.map((item) => {
          const Icon = item.icon
          return (
            <Card key={item.title} hoverable>
              <Icon className="mb-4 h-7 w-7 text-cyan-100" aria-hidden="true" />
              <h2 className="text-xl font-black text-white">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-white/66">{item.text}</p>
            </Card>
          )
        })}
      </motion.section>

      <motion.section className="insight-band" {...reveal}>
        <div>
          <h2 className="text-2xl font-black text-white sm:text-3xl">Built for repeat weather checks.</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/66">
            Search once, return later, and SkyCast Pro keeps your most useful places ready to revisit.
          </p>
          <p className="mt-4 text-xs font-semibold uppercase text-white/42">
            Updated {formatLocalDate(weather.location.localTime)} at {formatShortTime(weather.location.localTime)}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {statItems.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.label} className="rounded-lg border border-white/12 bg-white/8 p-4">
                <Icon className="mb-3 text-cyan-100" aria-hidden="true" />
                <span className="block text-xs text-white/54">{item.label}</span>
                <strong className="mt-1 block text-lg text-white">{item.value}</strong>
              </div>
            )
          })}
        </div>
      </motion.section>
    </div>
  )
}

export default Home
