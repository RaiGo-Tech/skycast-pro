import { useEffect, useMemo, useState } from 'react'
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

const Weather = () => {
  const [params] = useSearchParams()
  const { weather, loading, loadWeather, addFavorite } = useWeather()
  const [assistantOpen, setAssistantOpen] = useState(false)

  useEffect(() => {
    const city = params.get('city')
    if (city) loadWeather({ city })
  }, [loadWeather, params])

  const assistantReply = useMemo(() => {
    const rain = weather.daily[0]?.rainProbability ?? 0
    const wind = weather.current.windSpeed
    if (rain > 50) return 'Carry an umbrella and keep outdoor plans flexible. Rain chances are high today.'
    if (wind > 25) return 'Wind is stronger than usual, so avoid loose rooftop or balcony items.'
    return 'Weather looks manageable. Hydrate well and check alerts before evening travel.'
  }, [weather])

  if (loading && !weather) return <Loader />

  return (
    <div className="stack-grid">
      <header className="weather-toolbar glass-panel grid gap-3 sm:gap-4 p-3 sm:p-4 lg:p-5 grid-cols-1 sm:grid-cols-[minmax(0,1fr)_minmax(200px,auto)] lg:grid-cols-[minmax(180px,240px)_minmax(0,1fr)_auto] lg:items-center border border-white/10 rounded-lg lg:rounded-xl">
        <div className="min-w-0 order-2 sm:order-1 sm:col-span-2 lg:col-span-1">
          <p className="text-xs sm:text-sm font-semibold text-cyan-100">Advanced Weather Forecast Platform</p>
          <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">SkyCast Pro</h1>
        </div>
        <div className="order-1 sm:order-2 sm:col-span-2 lg:col-span-1 lg:order-2">
          <SearchBar />
        </div>
        <div className="order-3 weather-actions flex flex-wrap gap-2 col-span-full sm:col-span-2 lg:col-span-1 lg:flex-nowrap">
          <Button
            variant="secondary"
            size="md"
            className="flex-1 sm:flex-none"
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
            onClick={() => setAssistantOpen((open) => !open)}
          >
            <FiMessageCircle aria-hidden="true" className="h-5 w-5" />
            <span className="hidden sm:inline">Assistant</span>
          </Button>
        </div>
      </header>

      {assistantOpen ? (
        <Card>
          <SectionHeader title="AI Weather Assistant" subtitle="Demo mode" />
          <p className="text-white/78 text-sm sm:text-base leading-relaxed">{assistantReply}</p>
        </Card>
      ) : null}

      <section className="content-grid gap-3 sm:gap-4 lg:gap-5">
        <CurrentWeather weather={weather} />
        <HourlyForecast hourly={weather.hourly} />
        <div className="stack-grid gap-3 sm:gap-4">
          <AQICard aqi={weather.aqi} />
          <WeatherAlerts alerts={weather.alerts} />
        </div>
      </section>

      <section className="grid gap-3 sm:gap-4 lg:gap-5 grid-cols-1 lg:grid-cols-[1fr_1fr_0.82fr]">
        <WeeklyForecast daily={weather.daily} />
        <WeatherMap location={weather.location} />
        <div className="stack-grid gap-3 sm:gap-4">
          <WindStatus current={weather.current} />
          <SunriseSunset current={weather.current} />
          <UVIndex value={weather.current.uvIndex} />
        </div>
      </section>

      <section className="grid gap-3 sm:gap-4 lg:gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
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
      </section>

      <section className="grid gap-3 sm:gap-4 lg:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <WeatherCard label="Weekly Rainfall" value={`${weather.analytics.weeklyRainfall} mm`} icon="rain" meta="Up 12% from last week" />
        <WeatherCard label="Avg Temperature" value={`${weather.analytics.averageTemperature}°C`} icon="sunny" meta="Stable trend" />
        <WeatherCard label="Max Wind" value={`${weather.analytics.maxWind} km/h`} icon="cloudy" meta="Coastal breeze" />
        <WeatherCard label="Comfort Score" value={`${weather.analytics.comfort}%`} icon="partly-cloudy" meta="Good for travel" />
      </section>

    </div>
  )
}

export default Weather
