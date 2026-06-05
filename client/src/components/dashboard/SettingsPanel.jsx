import { FiBell, FiGlobe, FiMoon } from 'react-icons/fi'
import { Card, SectionHeader } from '../ui/Card'

const settings = [
  { label: 'Storm alerts', icon: FiBell, enabled: true },
  { label: 'Metric units', icon: FiGlobe, enabled: true },
  { label: 'Auto dark mode', icon: FiMoon, enabled: false },
]

const SettingsPanel = () => (
  <Card>
    <SectionHeader title="Weather Preferences" action="Local" />
    <div className="space-y-3">
      {settings.map((setting) => {
        const Icon = setting.icon
        return (
          <div key={setting.label} className="flex items-center justify-between rounded-lg bg-white/9 p-3">
            <span className="flex items-center gap-3 text-white">
              <Icon className="text-cyan-100" aria-hidden="true" />
              {setting.label}
            </span>
            <span className={`h-6 w-11 rounded-full p-1 ${setting.enabled ? 'bg-cyan-300' : 'bg-white/16'}`}>
              <span className={`block h-4 w-4 rounded-full bg-white transition ${setting.enabled ? 'translate-x-5' : ''}`} />
            </span>
          </div>
        )
      })}
    </div>
  </Card>
)

export default SettingsPanel
