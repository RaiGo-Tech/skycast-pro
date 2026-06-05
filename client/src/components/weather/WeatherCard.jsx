import WeatherIcon from './WeatherIcon'

const WeatherCard = ({ label, value, icon = 'partly-cloudy', meta }) => {
  return (
    <article className="min-w-0 rounded-lg bg-white/10 p-4 text-white">
      <WeatherIcon icon={icon} className="mb-2 h-10 w-10 text-amber-200" aria-hidden="true" />
      <p className="text-sm text-white/60">{label}</p>
      <strong className="break-words text-2xl">{value}</strong>
      {meta ? <p className="mt-1 text-xs text-white/48">{meta}</p> : null}
    </article>
  )
}

export default WeatherCard
