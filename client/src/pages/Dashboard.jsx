import { motion, useReducedMotion } from 'framer-motion'
import FavoriteCities from '../components/dashboard/FavoriteCities'
import SearchHistory from '../components/dashboard/SearchHistory'
import SettingsPanel from '../components/dashboard/SettingsPanel'
import UserDashboard from '../components/dashboard/UserDashboard'
import { useAuth } from '../hooks/useAuth'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 320, damping: 32 },
  },
}

const Dashboard = () => {
  const { user } = useAuth()
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className="stack-grid gap-6"
      variants={reduceMotion ? undefined : containerVariants}
      initial={reduceMotion ? false : 'hidden'}
      animate={reduceMotion ? { opacity: 1 } : 'visible'}
    >
      <motion.header
        className="insight-band"
        variants={reduceMotion ? undefined : itemVariants}
      >
        <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight animate-slide-up">
          Profile Dashboard
        </h1>
        <p className="mt-1.5 xs:mt-2 sm:mt-3 md:mt-4 text-xs xs:text-sm sm:text-base md:text-lg text-white/68 leading-relaxed">
          Track favorite cities, preferences, and search activity.
        </p>
      </motion.header>

      {/* User Profile & Favorites - 1 col mobile, 2 col desktop */}
      <motion.section
        className="grid gap-2.5 xs:gap-3 sm:gap-4 md:gap-5 lg:gap-6 grid-cols-1 xs:grid-cols-1 md:grid-cols-2 xl:grid-cols-2"
        variants={reduceMotion ? undefined : itemVariants}
      >
        <UserDashboard user={user} />
        <FavoriteCities />
      </motion.section>

      {/* Search History & Settings - 1 col mobile, 2 col desktop */}
      <motion.section
        className="grid gap-2.5 xs:gap-3 sm:gap-4 md:gap-5 lg:gap-6 grid-cols-1 xs:grid-cols-1 md:grid-cols-2 xl:grid-cols-2"
        variants={reduceMotion ? undefined : itemVariants}
      >
        <SearchHistory />
        <SettingsPanel />
      </motion.section>
    </motion.div>
  )
}

export default Dashboard
