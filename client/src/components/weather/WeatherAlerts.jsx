import { FiAlertTriangle, FiInfo, FiZap } from 'react-icons/fi'
import { Card, SectionHeader } from '../ui/Card'

const iconBySeverity = {
  high: FiAlertTriangle,
  medium: FiZap,
  low: FiInfo,
}

const toneBySeverity = {
  high: 'text-red-200 bg-red-400/18',
  medium: 'text-amber-200 bg-amber-300/18',
  low: 'text-cyan-100 bg-cyan-300/16',
}

const WeatherAlerts = ({ alerts = [] }) => (
  <Card>
    <SectionHeader title="Weather Alerts" action={`${alerts.length} active`} />
    <div className="space-y-2">
      {alerts.map((alert) => {
        const Icon = iconBySeverity[alert.severity] || FiInfo
        return (
          <article key={`${alert.title}-${alert.time}`} className="flex gap-3 rounded-lg bg-white/9 p-3">
            <span className={`grid h-10 w-10 flex-none place-items-center rounded-lg ${toneBySeverity[alert.severity]}`}>
              <Icon aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-white">{alert.title}</h3>
              <p className="mt-1 text-sm leading-5 text-white/70">{alert.description}</p>
              <p className="mt-2 text-xs text-white/48">{alert.time}</p>
            </div>
          </article>
        )
      })}
    </div>
  </Card>
)

export default WeatherAlerts
