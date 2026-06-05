import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiAirplay,
  FiBarChart2,
  FiCloudLightning,
  FiHeart,
  FiHome,
  FiLogIn,
  FiLogOut,
  FiSettings,
  FiUser,
  FiMenu,
  FiX,
} from 'react-icons/fi'
import { WiDayLightning } from 'react-icons/wi'
import { useAuth } from '../../hooks/useAuth'
import { useWeather } from '../../hooks/useWeather'
import WeatherIcon from '../weather/WeatherIcon'
import ThemeToggle from './ThemeToggle'

const navItems = [
  { to: '/', label: 'Overview', icon: FiHome },
  { to: '/weather', label: 'Forecast', icon: FiCloudLightning },
  { to: '/dashboard', label: 'Dashboard', icon: FiBarChart2 },
  { to: '/about', label: 'About', icon: FiAirplay },
]

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth()
  const { favorites } = useWeather()
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen)
  const closeMobileMenu = () => setMobileOpen(false)

  const sidebarVariants = {
    hidden: { x: '-100%', opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    exit: { x: '-100%', opacity: 0, transition: { duration: 0.2 } },
  }

  return (
    <>
      {/* Mobile Header */}
      <header className="sticky top-0 z-30 lg:hidden bg-gradient-to-b from-slate-950 to-slate-950/80 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between p-4">
          <Link to="/" className="flex items-center gap-2 min-w-max">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-500">
              <WiDayLightning className="h-6 w-6 text-slate-950" aria-hidden="true" />
            </span>
            <span className="text-lg font-bold text-white hidden sm:inline">SkyCast</span>
          </Link>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={toggleMobileMenu}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={closeMobileMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            className="fixed left-0 top-0 z-40 h-screen w-64 lg:hidden glass-panel border-r border-white/10 overflow-y-auto"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex h-full flex-col gap-4 p-4">
              <Link to="/" onClick={closeMobileMenu} className="flex items-center gap-3 mb-4">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-500">
                  <WiDayLightning className="h-6 w-6 text-slate-950" aria-hidden="true" />
                </span>
                <span className="text-xl font-black text-white">SkyCast Pro</span>
              </Link>

              <nav className="grid gap-1" aria-label="Main navigation">
                {navItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={closeMobileMenu}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-cyan-500/30 to-cyan-400/20 text-cyan-200 border-l-2 border-cyan-400'
                            : 'text-white hover:bg-white/10'
                        }`
                      }
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                      <span>{item.label}</span>
                    </NavLink>
                  )
                })}
              </nav>

              <div className="flex-1 border-t border-white/12 pt-4">
                <div className="mb-3 flex items-center justify-between text-sm px-2">
                  <span className="font-semibold text-white/84">Favorites</span>
                  <FiHeart className="text-cyan-200" aria-hidden="true" />
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {favorites.slice(0, 5).map((city) => (
                    <Link
                      key={city.cityName}
                      to={`/weather?city=${encodeURIComponent(city.cityName)}`}
                      onClick={closeMobileMenu}
                      className="flex items-center justify-between rounded-lg bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/20 transition"
                    >
                      <span className="flex items-center gap-2 min-w-0">
                        <WeatherIcon icon={city.icon} className="h-6 w-6 text-amber-200" aria-hidden="true" />
                        <span className="truncate">{city.cityName}</span>
                      </span>
                      <span className="font-semibold">{city.temp}°</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/12 pt-4 space-y-2">
                {isAuthenticated ? (
                  <>
                    {user && (
                      <div className="flex items-center gap-3 rounded-lg bg-white/10 p-3 text-sm text-white mb-2">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-500 text-slate-950 flex-shrink-0">
                          <FiUser aria-hidden="true" />
                        </span>
                        <span className="min-w-0">
                          <span className="block font-semibold truncate">{user.name}</span>
                          <span className="text-white/62 text-xs">{user.role}</span>
                        </span>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        logout()
                        closeMobileMenu()
                      }}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-white/10 px-4 py-3 text-sm font-semibold text-white hover:bg-white/20 transition"
                    >
                      <FiLogOut aria-hidden="true" className="h-5 w-5" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 hover:shadow-lg hover:shadow-cyan-500/30 transition"
                  >
                    <FiLogIn aria-hidden="true" className="h-5 w-5" />
                    <span>Login</span>
                  </Link>
                )}
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col gap-4 sticky top-4 h-fit glass-panel border border-white/10 rounded-xl p-5 backdrop-blur-xl">
        <Link to="/" className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-500">
            <WiDayLightning className="h-6 w-6 text-slate-950" aria-hidden="true" />
          </span>
          <span className="text-lg font-black text-white">SkyCast Pro</span>
        </Link>

        <nav className="grid gap-1" aria-label="Main navigation">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/30 to-cyan-400/20 text-cyan-200 border-l-2 border-cyan-400'
                      : 'text-white hover:bg-white/10'
                  }`
                }
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </nav>

        <div className="flex-1 border-t border-white/12 pt-4">
          <div className="mb-3 flex items-center justify-between text-sm px-2">
            <span className="font-semibold text-white/84">Favorites</span>
            <FiHeart className="text-cyan-200" aria-hidden="true" />
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {favorites.slice(0, 5).map((city) => (
              <Link
                key={city.cityName}
                to={`/weather?city=${encodeURIComponent(city.cityName)}`}
                className="flex items-center justify-between rounded-lg bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/20 transition"
              >
                <span className="flex items-center gap-2 min-w-0">
                  <WeatherIcon icon={city.icon} className="h-6 w-6 text-amber-200" aria-hidden="true" />
                  <span className="truncate">{city.cityName}</span>
                </span>
                <span className="font-semibold">{city.temp}°</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t border-white/12 pt-4 space-y-2">
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              to="/dashboard"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              aria-label="Settings"
            >
              <FiSettings aria-hidden="true" className="h-5 w-5" />
            </Link>
          </div>

          {isAuthenticated ? (
            <button
              type="button"
              onClick={logout}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-white/10 px-4 py-3 text-sm font-semibold text-white hover:bg-white/20 transition"
            >
              <FiLogOut aria-hidden="true" className="h-5 w-5" />
              <span>Logout</span>
            </button>
          ) : (
            <Link
              to="/login"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 hover:shadow-lg hover:shadow-cyan-500/30 transition"
            >
              <FiLogIn aria-hidden="true" className="h-5 w-5" />
              <span>Login</span>
            </Link>
          )}
        </div>

        {user && (
          <div className="rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 p-4 text-sm text-white">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-500 text-slate-950 mb-3">
              <FiUser aria-hidden="true" />
            </span>
            <div className="block">
              <span className="block font-semibold">{user.name}</span>
              <span className="text-white/62 text-xs">{user.role}</span>
            </div>
          </div>
        )}
      </aside>
    </>
  )
}

export default Navbar
