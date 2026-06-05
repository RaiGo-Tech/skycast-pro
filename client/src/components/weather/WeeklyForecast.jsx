import { FiDroplet } from 'react-icons/fi'
import { Card, SectionHeader } from '../ui/Card'
import WeatherIcon from './WeatherIcon'

const WeeklyForecast = ({ daily = [] }) => {
  const maxTemp = Math.max(...daily.map((day) => day.max), 1)

  return (
    <Card>
      <SectionHeader title="7-Day Forecast" action="Updated hourly" />
      <div className="space-y-2">
        {daily.map((day) => {
          return (
            <article key={`${day.day}-${day.date}`} className="grid grid-cols-[64px_42px_1fr_50px] items-center gap-3 rounded-lg bg-white/9 px-3 py-2">
              <div>
                <p className="text-sm font-bold text-white">{day.day}</p>
                <p className="text-xs text-white/55">{day.date}</p>
              </div>
              <WeatherIcon icon={day.icon} className="h-9 w-9 text-amber-200" aria-hidden="true" />
              <div>
                <div className="mb-1 flex items-center justify-between text-xs text-white/70">
                  <span>{Math.round(day.min)}°</span>
                  <span>{Math.round(day.max)}°</span>
                </div>
                <div className="h-2 rounded-full bg-white/12">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-emerald-300 via-cyan-300 to-amber-300"
                    style={{ width: `${Math.max(28, (day.max / maxTemp) * 100)}%` }}
                  />
                </div>
              </div>
              <span className="flex items-center justify-end gap-1 text-sm text-cyan-100">
                <FiDroplet aria-hidden="true" />
                {day.rainProbability}%
              </span>
            </article>
          )
        })}
      </div>
    </Card>
  )
}

export default WeeklyForecast
