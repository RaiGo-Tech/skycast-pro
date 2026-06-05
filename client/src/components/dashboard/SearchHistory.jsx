import { FiClock } from 'react-icons/fi'
import { useWeather } from '../../hooks/useWeather'
import { Card, SectionHeader } from '../ui/Card'

const SearchHistory = () => {
  const { recentSearches, loadWeather } = useWeather()

  return (
    <Card>
      <SectionHeader title="Search History" action="Recent" />
      <div className="flex flex-wrap gap-2">
        {recentSearches.map((city) => (
          <button
            key={city}
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm text-white transition hover:bg-white/18"
            onClick={() => loadWeather({ city })}
          >
            <FiClock aria-hidden="true" />
            {city}
          </button>
        ))}
      </div>
    </Card>
  )
}

export default SearchHistory
