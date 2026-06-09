import { FiClock } from 'react-icons/fi'
import { useWeather } from '../../hooks/useWeather'
import { formatLocalDate, formatShortTime } from '../../utils/formatDate'
import { Card, SectionHeader } from '../ui/Card'

const SearchHistory = () => {
  const { historyLoading, loadWeather, recentSearches, weatherHistory } = useWeather()
  const rows = weatherHistory.length
    ? weatherHistory
    : recentSearches.map((city) => ({ id: city, cityName: city, searchedCity: city }))

  return (
    <Card>
      <SectionHeader title="Search History" action={historyLoading ? 'Syncing' : 'Recent'} />
      <div className="grid gap-2">
        {rows.map((item) => (
          <button
            key={item.id}
            type="button"
            className="flex min-w-0 items-center justify-between gap-3 rounded-lg bg-white/10 px-3 py-2 text-left text-sm text-white transition hover:bg-white/18"
            onClick={() => loadWeather({ city: item.cityName })}
          >
            <span className="flex min-w-0 items-center gap-2">
              <FiClock className="flex-none text-cyan-100" aria-hidden="true" />
              <span className="min-w-0">
                <span className="block truncate font-semibold">
                  {item.cityName}
                  {item.country ? `, ${item.country}` : ''}
                </span>
                <span className="block truncate text-xs text-white/58">
                  {item.searchedAt
                    ? `${formatLocalDate(item.searchedAt)} at ${formatShortTime(item.searchedAt)}`
                    : 'Saved locally'}
                </span>
              </span>
            </span>
            {item.weatherSummary?.temp !== undefined && item.weatherSummary?.temp !== null ? (
              <span className="flex-none rounded-lg bg-white/10 px-2 py-1 text-xs font-bold text-cyan-100">
                {Math.round(item.weatherSummary.temp)} C - {item.weatherSummary.condition || 'Weather'}
              </span>
            ) : null}
          </button>
        ))}
      </div>
    </Card>
  )
}

export default SearchHistory
