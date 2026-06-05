import { FiActivity, FiDroplet, FiEye, FiMapPin, FiThermometer, FiWind } from 'react-icons/fi'
import { formatLocalDate, formatShortTime } from '../../utils/formatDate'
import { formatTemp, getWeatherMood } from '../../utils/weatherHelpers'
import WeatherIcon from './WeatherIcon'

const Metric = ({ icon: Icon, label, value }) => (
  <div className="rounded-lg bg-white/12 p-3">
    <div className="flex items-center gap-2 text-xs text-white/70">
      <Icon aria-hidden="true" />
      {label}
    </div>
    <div className="mt-2 text-lg font-bold text-white">{value}</div>
  </div>
)

const CurrentWeather = ({ weather }) => {
  return (
    <section className="weather-card glass-panel min-h-[300px] rounded-lg p-3 xs:p-4 sm:p-5">
      <div className="flex h-full min-w-0 flex-col justify-between gap-6">
        <div className="flex flex-col gap-3 xs:flex-row xs:items-start xs:justify-between sm:gap-4">
          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-2 text-white/74">
              <FiMapPin aria-hidden="true" />
              <span className="text-sm font-semibold">
                {weather.location.city}, {weather.location.country}
              </span>
            </div>
            <h1 className="break-words text-3xl font-black text-white xs:text-4xl sm:text-5xl">{weather.location.city}</h1>
            <p className="mt-2 text-sm text-white/72">
              {formatLocalDate(weather.location.localTime)} | {formatShortTime(weather.location.localTime)}
            </p>
          </div>
          <span className="w-fit flex-none rounded-lg bg-emerald-300/18 px-3 py-2 text-xs font-semibold text-emerald-100 sm:text-sm">
            {getWeatherMood(weather.current.condition)}
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-5">
          <div className="min-w-0">
            <div className="text-5xl font-black leading-none text-white xs:text-6xl sm:text-7xl xl:text-8xl">
              {formatTemp(weather.current.temp)}
            </div>
            <p className="mt-3 text-lg font-semibold text-white sm:text-xl">Feels like {formatTemp(weather.current.feelsLike)}</p>
            <p className="text-white/74">{weather.current.condition}</p>
          </div>
          <WeatherIcon icon={weather.current.icon} className="weather-icon h-20 w-20 text-amber-200 xs:h-24 xs:w-24 sm:h-32 sm:w-32 xl:h-36 xl:w-36" aria-hidden="true" />
        </div>

        <div className="metric-grid">
          <Metric icon={FiDroplet} label="Humidity" value={`${weather.current.humidity}%`} />
          <Metric icon={FiWind} label="Wind" value={`${weather.current.windSpeed} km/h`} />
          <Metric icon={FiActivity} label="Pressure" value={`${weather.current.pressure} hPa`} />
          <Metric icon={FiEye} label="Visibility" value={`${weather.current.visibility} km`} />
          <Metric icon={FiThermometer} label="UV Index" value={weather.current.uvIndex} />
        </div>
      </div>
    </section>
  )
}

export default CurrentWeather
