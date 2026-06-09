import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Link, NavLink } from 'react-router-dom'
import {
  FiBarChart2,
  FiCloudLightning,
  FiHome,
  FiInfo,
  FiLogIn,
  FiLogOut,
  FiMapPin,
  FiMenu,
  FiUser,
  FiX,
} from 'react-icons/fi'
import { useAuth } from '../../hooks/useAuth'
import { useWeather } from '../../hooks/useWeather'
import BrandLogo from './BrandLogo'
import ThemeToggle from './ThemeToggle'

const navItems = [
  { to: '/', label: 'Overview', icon: FiHome },
  { to: '/weather', label: 'Forecast', icon: FiCloudLightning },
  { to: '/dashboard', label: 'Dashboard', icon: FiBarChart2 },
  { to: '/about', label: 'About', icon: FiInfo },
]

const navClass = ({ isActive }) =>
  `site-nav-link ${isActive ? 'site-nav-link-active' : ''}`

const MobileNavLink = ({ item, onClick }) => {
  const Icon = item.icon

  return (
    <NavLink to={item.to} onClick={onClick} className={navClass}>
      <Icon aria-hidden="true" />
      <span>{item.label}</span>
    </NavLink>
  )
}

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth()
  const { weather } = useWeather()
  const [mobileOpen, setMobileOpen] = useState(false)
  const reduceMotion = useReducedMotion()

  const closeMobile = () => setMobileOpen(false)

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <BrandLogo compact className="min-w-0" textClassName="hidden xs:block" />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink key={item.to} to={item.to} className={navClass}>
                <Icon aria-hidden="true" />
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </nav>

        <div className="ml-auto flex min-w-0 items-center gap-2">
          <div className="hidden min-w-0 items-center gap-2 rounded-lg border border-white/12 bg-white/8 px-3 py-2 text-sm text-white/82 md:flex">
            <FiMapPin className="flex-none text-cyan-100" aria-hidden="true" />
            <span className="truncate">{weather?.location?.city || 'Mumbai'}</span>
            <span className="flex-none font-bold text-white">{Math.round(weather?.current?.temp ?? 28)} C</span>
          </div>

          <ThemeToggle />

          {isAuthenticated ? (
            <button
              type="button"
              onClick={logout}
              className="hidden h-10 items-center justify-center gap-2 rounded-lg bg-white/10 px-4 text-sm font-bold text-white transition hover:bg-white/18 sm:inline-flex"
            >
              <FiLogOut aria-hidden="true" />
              <span>Logout</span>
            </button>
          ) : (
            <Link
              to="/login"
              className="hidden h-10 items-center justify-center gap-2 rounded-lg bg-cyan-300 px-4 text-sm font-black text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-200 sm:inline-flex"
            >
              <FiLogIn aria-hidden="true" />
              <span>Login</span>
            </Link>
          )}

          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-lg bg-white/10 text-white transition hover:bg-white/18 lg:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            className="site-mobile-panel lg:hidden"
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <nav className="grid gap-2" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <MobileNavLink key={item.to} item={item} onClick={closeMobile} />
              ))}
            </nav>

            <div className="mt-3 rounded-lg border border-white/12 bg-white/8 p-3 text-sm text-white/78">
              {isAuthenticated ? (
                <div className="flex items-center justify-between gap-3">
                  <span className="flex min-w-0 items-center gap-2">
                    <FiUser className="flex-none text-cyan-100" aria-hidden="true" />
                    <span className="truncate">{user?.name || 'SkyCast User'}</span>
                  </span>
                  <button type="button" className="font-bold text-cyan-100" onClick={logout}>
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMobile}
                  className="flex min-h-11 items-center justify-center gap-2 rounded-lg bg-cyan-300 px-4 font-black text-slate-950"
                >
                  <FiLogIn aria-hidden="true" />
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
