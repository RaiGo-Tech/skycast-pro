import { FiSunrise, FiSunset } from 'react-icons/fi'
import { Card, SectionHeader } from '../ui/Card'

const SunriseSunset = ({ current }) => (
  <Card>
    <SectionHeader title="Sunrise / Sunset" />
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-lg bg-white/10 p-4 text-center">
        <FiSunrise className="mx-auto mb-2 h-8 w-8 text-amber-200" aria-hidden="true" />
        <p className="text-sm text-white/58">Sunrise</p>
        <strong className="text-2xl text-white">{current.sunrise}</strong>
      </div>
      <div className="rounded-lg bg-white/10 p-4 text-center">
        <FiSunset className="mx-auto mb-2 h-8 w-8 text-orange-200" aria-hidden="true" />
        <p className="text-sm text-white/58">Sunset</p>
        <strong className="text-2xl text-white">{current.sunset}</strong>
      </div>
    </div>
  </Card>
)

export default SunriseSunset
