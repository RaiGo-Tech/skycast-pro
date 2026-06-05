import { FiCompass, FiLayers } from 'react-icons/fi'
import { Card, SectionHeader } from '../ui/Card'

const WeatherMap = ({ location }) => {
  const lat = Number(location.lat) || 19.076
  const lon = Number(location.lon) || 72.8777
  const delta = 0.12
  const bbox = `${lon - delta},${lat - delta},${lon + delta},${lat + delta}`
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`

  return (
    <Card>
      <SectionHeader title="Weather Map" action={<span className="inline-flex items-center gap-1"><FiLayers /> Radar view</span>} />
      <div className="overflow-hidden rounded-lg border border-white/12">
        <iframe title="Weather map" className="map-frame" src={src} loading="lazy" />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-sm text-white/72">
        <div className="rounded-lg bg-white/10 p-3">
          <FiCompass className="mb-2 text-cyan-100" aria-hidden="true" />
          <span className="block text-xs text-white/48">Lat</span>
          <strong className="text-white">{lat.toFixed(2)}</strong>
        </div>
        <div className="rounded-lg bg-white/10 p-3">
          <span className="block text-xs text-white/48">Lon</span>
          <strong className="text-white">{lon.toFixed(2)}</strong>
        </div>
        <div className="rounded-lg bg-white/10 p-3">
          <span className="block text-xs text-white/48">Layer</span>
          <strong className="text-white">Wind</strong>
        </div>
      </div>
    </Card>
  )
}

export default WeatherMap
