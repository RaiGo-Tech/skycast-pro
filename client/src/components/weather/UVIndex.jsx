import { FiSun } from 'react-icons/fi'
import { Card, SectionHeader } from '../ui/Card'

const UVIndex = ({ value }) => (
  <Card>
    <SectionHeader title="UV Index" action={value <= 3 ? 'Low' : value <= 6 ? 'Moderate' : 'High'} />
    <div className="flex items-center gap-4">
      <span className="grid h-16 w-16 place-items-center rounded-lg bg-amber-300/18 text-amber-100">
        <FiSun className="h-8 w-8" aria-hidden="true" />
      </span>
      <div>
        <strong className="text-5xl text-white">{value}</strong>
        <p className="text-sm text-white/62">Use sunscreen for long outdoor plans.</p>
      </div>
    </div>
  </Card>
)

export default UVIndex
