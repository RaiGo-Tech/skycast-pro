import { FiActivity } from 'react-icons/fi'
import { Card, SectionHeader } from '../ui/Card'
import { getAqiPercent } from '../../utils/weatherHelpers'

const AQICard = ({ aqi }) => (
  <Card>
    <SectionHeader title="Air Quality" action={aqi.level} />
    <div className="grid gap-5 2xl:grid-cols-[150px_1fr]">
      <div className="relative grid h-36 place-items-center">
        <div
          className="absolute h-32 w-32 rounded-full"
          style={{
            background: `conic-gradient(#a3e635 ${getAqiPercent(aqi.index)}%, rgba(255,255,255,0.14) 0)`,
          }}
        />
        <div className="relative grid h-24 w-24 place-items-center rounded-full bg-slate-950/45 text-center">
          <span className="text-xs text-white/64">AQI</span>
          <strong className="block text-4xl text-white">{aqi.index}</strong>
          <span className="text-xs text-white/80">{aqi.level}</span>
        </div>
      </div>
      <div>
        <div className="mb-4 flex items-start gap-3 rounded-lg bg-white/10 p-3">
          <FiActivity className="mt-1 text-lime-200" aria-hidden="true" />
          <p className="text-sm leading-6 text-white/78">{aqi.recommendation}</p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-center text-sm sm:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3">
          {[
            ['PM2.5', aqi.pm25],
            ['PM10', aqi.pm10],
            ['O3', aqi.o3],
            ['NO2', aqi.no2],
            ['SO2', aqi.so2],
            ['CO', aqi.co],
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg bg-white/9 p-2">
              <span className="block text-xs text-white/56">{label}</span>
              <strong className="text-white">{value}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Card>
)

export default AQICard
