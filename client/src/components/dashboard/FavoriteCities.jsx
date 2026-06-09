import { FiTrash2 } from 'react-icons/fi'
import { useWeather } from '../../hooks/useWeather'
import { Card, SectionHeader } from '../ui/Card'
import WeatherIcon from '../weather/WeatherIcon'

const FavoriteCities = () => {
  const { favorites, removeFavorite, loadWeather } = useWeather()

  return (
    <Card>
      <SectionHeader title="Favorite Cities" action={`${favorites.length} saved`} />
      <div className="space-y-2">
        {favorites.map((city) => {
          return (
            <article key={city.cityName} className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-white/9 p-3">
              <button type="button" className="flex min-w-0 flex-1 items-center gap-3 text-left" onClick={() => loadWeather({ city: city.cityName })}>
                <WeatherIcon icon={city.icon} className="h-9 w-9 text-amber-200" aria-hidden="true" />
                <span className="min-w-0">
                  <span className="block truncate font-bold text-white">{city.cityName}</span>
                  <span className="text-xs text-white/56">{city.country}</span>
                </span>
              </button>
              <div className="flex flex-none items-center gap-3">
                <span className="font-bold text-white">{city.temp} C</span>
                <button
                  type="button"
                  className="rounded-lg p-2 text-white/58 transition hover:bg-red-500/16 hover:text-red-100"
                  onClick={() => removeFavorite(city.cityName)}
                  aria-label={`Remove ${city.cityName}`}
                >
                  <FiTrash2 aria-hidden="true" />
                </button>
              </div>
            </article>
          )
        })}
      </div>
    </Card>
  )
}

export default FavoriteCities
