import { FiActivity, FiCloudRain, FiDatabase, FiUsers } from 'react-icons/fi'
import { useWeather } from '../../hooks/useWeather'
import { Card, SectionHeader } from '../ui/Card'

const UserDashboard = ({ user }) => {
  const { favorites, recentSearches, weatherHistory } = useWeather()
  const stats = [
    { label: 'Saved Cities', value: String(favorites.length), icon: FiCloudRain },
    { label: 'Searches', value: String(weatherHistory.length || recentSearches.length), icon: FiActivity },
    { label: 'Storage', value: weatherHistory.length ? 'Supabase' : 'Local', icon: FiDatabase },
    { label: 'Users', value: 'Auth', icon: FiUsers },
  ]

  return (
    <Card>
      <SectionHeader title="Profile Dashboard" action={user?.role || 'student'} />
      <div className="mb-4 min-w-0 rounded-lg bg-white/10 p-4">
        <p className="text-sm text-white/62">Signed in as</p>
        <h2 className="truncate text-2xl font-black text-white">{user?.name || 'SkyCast Student'}</h2>
        <p className="truncate text-white/70">{user?.email || 'demo@skycast.dev'}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="rounded-lg bg-white/9 p-4">
              <Icon className="mb-3 text-cyan-100" aria-hidden="true" />
              <span className="block text-sm text-white/58">{stat.label}</span>
              <strong className="text-2xl text-white">{stat.value}</strong>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

export default UserDashboard
