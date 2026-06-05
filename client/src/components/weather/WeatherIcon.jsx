import { weatherIconMap } from '../../utils/weatherHelpers'

const WeatherIcon = ({ icon = 'partly-cloudy', className = '', ...props }) => {
  const Icon = weatherIconMap[icon] || weatherIconMap['partly-cloudy']
  return <Icon className={className} {...props} />
}

export default WeatherIcon
