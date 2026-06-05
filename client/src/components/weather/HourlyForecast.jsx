import { FiDroplet } from 'react-icons/fi'
import { Card, SectionHeader } from '../ui/Card'
import TemperatureChart from '../charts/TemperatureChart'
import WeatherIcon from './WeatherIcon'

const HourlyForecast = ({ hourly = [] }) => (
  <Card className="min-h-[360px]">
    <SectionHeader title="Hourly Forecast" action="Live trend" />
    <div className="scroll-row">
      {hourly.map((hour) => {
        return (
          <article key={`${hour.time}-${hour.temp}`} className="min-w-[78px] rounded-lg bg-white/10 p-3 text-center">
            <p className="text-xs font-semibold text-white/70">{hour.time}</p>
            <WeatherIcon icon={hour.icon} className="mx-auto my-2 h-10 w-10 text-amber-200" aria-hidden="true" />
            <p className="text-xl font-bold text-white">{Math.round(hour.temp)}°</p>
            <p className="mt-2 flex items-center justify-center gap-1 text-xs text-cyan-100">
              <FiDroplet aria-hidden="true" />
              {hour.rainProbability}%
            </p>
          </article>
        )
      })}
    </div>
    <div className="chart-shell mt-4">
      <TemperatureChart data={hourly} />
    </div>
  </Card>
)

export default HourlyForecast
