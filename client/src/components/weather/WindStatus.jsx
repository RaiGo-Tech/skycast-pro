import { FiWind } from 'react-icons/fi'
import { Card, SectionHeader } from '../ui/Card'

const WindStatus = ({ current }) => (
  <Card>
    <SectionHeader title="Wind Direction" action={current.windDirection} />
    <div className="grid place-items-center">
      <div className="relative grid h-32 w-32 place-items-center rounded-full border border-white/20 bg-white/10">
        <FiWind className="h-12 w-12 text-cyan-100" aria-hidden="true" />
        <span className="absolute top-2 text-xs text-white/58">N</span>
        <span className="absolute bottom-2 text-xs text-white/58">S</span>
        <span className="absolute left-3 text-xs text-white/58">W</span>
        <span className="absolute right-3 text-xs text-white/58">E</span>
      </div>
      <p className="mt-3 text-3xl font-black text-white">{current.windSpeed} km/h</p>
      <p className="text-sm text-white/62">Sea breeze from {current.windDirection}</p>
    </div>
  </Card>
)

export default WindStatus
