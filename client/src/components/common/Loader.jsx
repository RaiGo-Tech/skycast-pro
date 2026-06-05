import { WiDaySunny } from 'react-icons/wi'

const Loader = ({ label = 'Loading weather', compact = false }) => (
  <div className={`grid place-items-center text-center text-white ${compact ? 'min-h-0 py-3' : 'min-h-48'}`}>
    <div>
      <WiDaySunny className={`mx-auto animate-spin text-amber-300 ${compact ? 'h-8 w-8' : 'h-16 w-16'}`} aria-hidden="true" />
      <p className={`text-sm text-white/76 ${compact ? 'mt-1' : 'mt-2'}`}>{label}</p>
    </div>
  </div>
)

export default Loader
