import { useMemo } from 'react'


import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'

import toast from 'react-hot-toast'
import { FiCloud, FiDroplet, FiMapPin, FiSearch, FiZap } from 'react-icons/fi'
import SearchBar from '../components/common/SearchBar'
import { Card } from '../components/ui/Card'
import { useWeather } from '../hooks/useWeather'
import Loader from '../components/common/Loader'

const cloudVariants = {
  hidden: { y: 18, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 120, damping: 18 },
  },
}

const floatVariants = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
  },
}

const heroContainerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.08 },
  },
}

const heroItemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: [0.4, 0, 0.2, 1] },
  },
}

const revealVariants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: [0.4, 0, 0.2, 1] },
  },
}

const Home = () => {
  const { weather, loading } = useWeather()
  const shouldReduceMotion = useReducedMotion()
  const bgMode = useMemo(() => {
    const icon = weather?.current?.icon

    if (!icon) return 'sky'
    const i = String(icon).toLowerCase()
    if (i.includes('rain') || i.includes('drizzle')) return 'rain'
    if (i.includes('snow')) return 'snow'
    if (i.includes('thunder')) return 'storm'
    if (i.includes('cloud')) return 'cloud'
    return 'sky'
  }, [weather])

  const heroBg = useMemo(() => {
    const map = {
      sky: 'bg-[radial-gradient(1200px_circle_at_20%_20%,rgba(56,189,248,0.35),transparent_55%),radial-gradient(900px_circle_at_80%_10%,rgba(168,85,247,0.35),transparent_50%),linear-gradient(180deg,#060B1A_0%,#070A12_55%,#050711_100%)]',
      rain: 'bg-[radial-gradient(1000px_circle_at_10%_10%,rgba(59,130,246,0.35),transparent_50%),radial-gradient(900px_circle_at_80%_20%,rgba(129,140,248,0.32),transparent_55%),linear-gradient(180deg,#040A18_0%,#050B16_60%,#040611_100%)]',
      snow: 'bg-[radial-gradient(1100px_circle_at_15%_15%,rgba(147,197,253,0.35),transparent_55%),radial-gradient(900px_circle_at_85%_20%,rgba(199,210,254,0.25),transparent_55%),linear-gradient(180deg,#040913_0%,#050B16_60%,#040611_100%)]',
      storm: 'bg-[radial-gradient(1100px_circle_at_20%_30%,rgba(99,102,241,0.35),transparent_52%),radial-gradient(1000px_circle_at_80%_20%,rgba(29,78,216,0.35),transparent_55%),linear-gradient(180deg,#050713_0%,#08081A_55%,#050611_100%)]',
      cloud: 'bg-[radial-gradient(1200px_circle_at_20%_20%,rgba(148,163,184,0.28),transparent_52%),radial-gradient(1000px_circle_at_80%_10%,rgba(168,85,247,0.30),transparent_55%),linear-gradient(180deg,#060B1A_0%,#070A12_55%,#050711_100%)]',
    }
    return map[bgMode] || map.sky
  }, [bgMode])

  const quickFeatures = useMemo(
    () => [
      { icon: FiMapPin, title: 'Search by city, country, ZIP', desc: 'Auto-suggestions + recent searches.' },
      { icon: FiCloud, title: '7-day + hourly forecasts', desc: 'Animated daily cards and scrollable hours.' },
      { icon: FiDroplet, title: 'AQI + alerts', desc: 'Health recommendations and storm/rain warnings.' },
      { icon: FiZap, title: 'Premium UX', desc: 'Glass UI, smooth motion, and skeleton loaders.' },
    ],
    [],
  )

  const revealMotion = shouldReduceMotion
    ? {}
    : {
        initial: 'hidden',
        whileInView: 'show',
        viewport: { once: true, amount: 0.18 },
        variants: revealVariants,
      }

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/55 shadow-2xl shadow-black/30 ${heroBg}`}>
      {/* Subtle animated ambiance layers */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-x-0 top-0 h-44 bg-gradient-to-r from-cyan-300/12 via-transparent to-violet-300/12 blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.div
          className="absolute -right-16 top-20 h-56 w-2/3 rotate-6 bg-gradient-to-l from-purple-400/12 to-transparent blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.15 }}
        />
        <motion.div
          className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-cyan-500/8 via-transparent to-transparent blur-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-7xl px-3 xs:px-4 sm:px-6 lg:px-8 pb-8 xs:pb-12 sm:pb-16 lg:pb-20 pt-6 xs:pt-8 sm:pt-12 lg:pt-16">
        {/* Hero */}
        <motion.section
          className="relative grid gap-6 xs:gap-8 sm:gap-10 lg:gap-12 lg:grid-cols-[minmax(0,1.12fr)_minmax(300px,0.88fr)] lg:items-center"
          variants={shouldReduceMotion ? undefined : heroContainerVariants}
          initial={shouldReduceMotion ? false : 'hidden'}
          animate={shouldReduceMotion ? undefined : 'show'}
        >
          {/* Premium animated spotlight */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-40 rounded-[100px] bg-gradient-to-r from-cyan-400/10 via-violet-400/10 to-transparent blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />

          <motion.div className="relative z-10 min-w-0 space-y-3 xs:space-y-4 sm:space-y-5 lg:space-y-6" variants={heroItemVariants}>
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-2.5 xs:px-3 py-1 xs:py-1.5 text-xs sm:text-sm font-semibold text-white/80 backdrop-blur"
              variants={heroItemVariants}
            >
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-cyan-300/20 text-cyan-200 flex-shrink-0">
                <FiZap aria-hidden="true" className="h-3 w-3 xs:h-4 xs:w-4" />
              </span>
              Premium Weather Forecast Platform
            </motion.div>

            <motion.h1
              className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight text-white leading-[1.2] drop-shadow-[0_2px_18px_rgba(0,0,0,0.42)]"
              variants={heroItemVariants}
            >
              SkyCast Pro
              <span className="block bg-gradient-to-r from-cyan-200 via-sky-300 to-violet-200 bg-clip-text text-transparent mt-1.5 xs:mt-2">
                Precision forecasts. Glass-smooth.
              </span>
            </motion.h1>

            <motion.p className="max-w-xl text-xs xs:text-sm sm:text-base lg:text-lg leading-relaxed text-white/75" variants={heroItemVariants}>
              Get current weather, 7-day plans, hourly insights, AQI recommendations, and alerts—wrapped in a modern dashboard built for everyday use.
            </motion.p>

            <motion.div className="flex flex-col gap-2.5 xs:gap-3 sm:flex-row sm:items-center pt-1 xs:pt-2 sm:pt-4" variants={heroItemVariants}>
              <Link
                to="/weather"
                className="inline-flex min-h-10 xs:min-h-11 sm:min-h-12 items-center justify-center gap-2 rounded-lg xs:rounded-lg sm:rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 px-4 xs:px-5 sm:px-6 text-xs xs:text-sm sm:text-base font-bold text-slate-950 shadow-premium shadow-cyan-500/30 transition duration-300 ease-smooth hover:-translate-y-0.5 hover:shadow-premium-lg hover:shadow-cyan-500/50 active:scale-95 touch:active:scale-[0.98]"
              >
                <FiSearch aria-hidden="true" className="h-4 w-4 xs:h-5 xs:w-5 flex-shrink-0" />
                <span>Try dashboard</span>
              </Link>
              <Link
                to="/about"
                className="inline-flex min-h-10 xs:min-h-11 sm:min-h-12 items-center justify-center rounded-lg xs:rounded-lg sm:rounded-xl border border-white/18 bg-white/5 px-4 xs:px-5 sm:px-6 text-xs xs:text-sm sm:text-base font-semibold text-white/90 transition duration-300 ease-smooth hover:-translate-y-0.5 hover:bg-white/15 hover:border-white/25 touch:active:bg-white/10"
              >
                See how it works
              </Link>
            </motion.div>

            <motion.div className="pt-1 xs:pt-2 sm:pt-4" variants={heroItemVariants}>
              <Card responsive={true}>
                <div className="mb-2.5 xs:mb-3 sm:mb-4 flex flex-col xs:flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <p className="text-xs xs:text-sm font-semibold text-white/90">Search & preview instantly</p>
                    <p className="text-xs text-white/60">Type a city, or use voice/geolocation.</p>
                  </div>
                  {loading ? <span className="text-xs text-cyan-200 xs:whitespace-nowrap">Updating…</span> : null}
                </div>
                <SearchBar />
              </Card>
            </motion.div>
          </motion.div>

          {/* Animated hero art */}
          <div className="relative z-10 hidden min-w-0 lg:flex lg:flex-col lg:gap-5 lg:self-start lg:pt-8 xl:gap-6">
            <motion.div
              className="relative z-10 ml-auto w-full max-w-[26rem] xl:max-w-[30rem]"
              variants={cloudVariants}
              initial="hidden"
              animate="show"
            >
              <motion.div className="rounded-xl sm:rounded-2xl bg-white/5 p-3 xs:p-4 sm:p-5 lg:p-6 backdrop-blur-xl border border-white/10 shadow-xl shadow-black/10" animate="animate" variants={floatVariants}>
                <div className="flex items-center gap-2.5 xs:gap-3">
                  <div className="grid h-11 xs:h-12 w-11 xs:w-12 place-items-center rounded-lg xs:rounded-xl bg-cyan-400/15 text-cyan-200 flex-shrink-0">
                    <FiCloud aria-hidden="true" className="h-5 w-5 xs:h-6 xs:w-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs xs:text-xs sm:text-sm font-semibold text-white/90 truncate">Today in {weather?.location?.city || 'your area'}</p>
                    <p className="text-xs text-white/60">Auto-updates as you search</p>
                  </div>
                </div>
                <div className="mt-3 xs:mt-4 grid grid-cols-2 gap-2 xs:gap-2.5 sm:gap-3">
                  <div className="rounded-lg xs:rounded-lg sm:rounded-xl border border-white/10 bg-white/5 p-2.5 xs:p-3">
                    <p className="text-xs text-white/60">Temperature</p>
                    <p className="text-lg xs:text-xl sm:text-2xl font-black text-white">{weather?.current?.temp ?? 28}°C</p>
                  </div>
                  <div className="rounded-lg xs:rounded-lg sm:rounded-xl border border-white/10 bg-white/5 p-2.5 xs:p-3">
                    <p className="text-xs text-white/60">Condition</p>
                    <p className="text-xs sm:text-sm font-semibold text-white/90 truncate">{weather?.current?.condition ?? 'Partly cloudy'}</p>
                  </div>
                </div>

                <div className="mt-2.5 xs:mt-3 text-xs text-white/60">
                  Tip: Open the Forecast page to see hourly and 7-day cards.
                </div>
              </motion.div>
            </motion.div>

            {/* Clouds */}
            <div className="pointer-events-none absolute right-0 top-4 z-0 h-48 w-72 rotate-6 opacity-80 sm:-right-8 sm:w-80">
              <motion.div
                className="absolute left-10 top-10 h-20 w-48 rounded-full bg-white/10 blur"
                initial={{ opacity: 0.2 }}
                animate={{ x: [-14, 10, -14], opacity: [0.2, 0.32, 0.2] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute left-2 top-20 h-24 w-56 rounded-full bg-white/10 blur"
                initial={{ opacity: 0.18 }}
                animate={{ x: [8, -12, 8], opacity: [0.18, 0.3, 0.18] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>

            <div className="relative z-20 ml-auto w-full max-w-[32rem]">
              {loading && !weather ? (
                <div className="flex items-center justify-center">
                  <Loader label="Loading premium preview…" />
                </div>
              ) : null}
              <div className="relative rounded-lg xs:rounded-xl sm:rounded-2xl border border-white/15 bg-white/5 p-3 xs:p-4 sm:p-5 backdrop-blur-xl">
                <p className="text-xs font-semibold uppercase tracking-wider text-white/60">What you get</p>
                <div className="mt-2.5 xs:mt-3 sm:mt-4 grid gap-2 xs:gap-2.5 sm:gap-3">
                  {quickFeatures.slice(0, 3).map((item, index) => (
                    <motion.div
                      key={item.title}
                      className="flex items-start gap-2 xs:gap-2.5 rounded-lg xs:rounded-lg border border-white/10 bg-white/5 p-2 xs:p-2.5 transition-colors hover:bg-white/10"
                      initial={shouldReduceMotion ? false : { opacity: 0, x: 12 }}
                      animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                      transition={{ delay: 0.28 + index * 0.08, duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <div className="mt-0.5 grid h-8 xs:h-9 w-8 xs:w-9 sm:h-10 sm:w-10 place-items-center rounded-lg bg-cyan-400/15 text-cyan-200 flex-shrink-0">
                        <item.icon aria-hidden="true" className="h-4 w-4 xs:h-5 xs:w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs xs:text-xs sm:text-sm font-semibold text-white/92">{item.title}</p>
                        <p className="text-xs text-white/65 leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <button
                  type="button"
                  className="mt-2.5 xs:mt-3 sm:mt-4 w-full rounded-lg xs:rounded-lg bg-white/10 hover:bg-white/15 px-4 py-2 xs:py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white transition duration-300 ease-smooth active:scale-95 touch:active:scale-[0.98]"
                  onClick={() => {
                    try {
                      toast.success('Opening forecast…')
                    } catch {
                      // ignore
                    }
                    window.location.assign('/weather')
                  }}
                >
                  Open Forecast Dashboard
                </button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Feature grid */}
        <motion.section
          className="mt-8 xs:mt-10 sm:mt-16 lg:mt-20 grid grid-cols-1 gap-2.5 xs:gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4"
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView={shouldReduceMotion ? undefined : 'show'}
          viewport={{ once: true, amount: 0.18 }}
          variants={heroContainerVariants}
        >
          {quickFeatures.map((item, index) => (
            <motion.div
              key={item.title}
              className="rounded-lg xs:rounded-xl border border-white/15 bg-white/5 p-3 xs:p-4 sm:p-5 backdrop-blur-xl hover:border-white/25 hover:bg-white/10 transition-all duration-300 ease-smooth"
              custom={index}
              variants={revealVariants}
              whileHover={shouldReduceMotion ? undefined : { scale: 1.02, y: -2 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            >
              <div className="flex items-start xs:items-center gap-2.5 xs:gap-3">
                <div className="grid h-10 xs:h-11 w-10 xs:w-11 sm:h-12 sm:w-12 flex-none place-items-center rounded-lg xs:rounded-xl bg-cyan-400/15 text-cyan-200 flex-shrink-0">
                  <item.icon aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <p className="text-xs xs:text-sm sm:text-base font-bold text-white leading-snug">{item.title}</p>
              </div>
              <p className="mt-2.5 xs:mt-3 text-xs sm:text-sm leading-relaxed text-white/70">{item.desc}</p>
            </motion.div>
          ))}
        </motion.section>

        {/* Footer CTA */}
        <motion.section className="mt-8 xs:mt-10 sm:mt-16 lg:mt-20" {...revealMotion}>
          <div className="rounded-lg xs:rounded-xl sm:rounded-2xl border border-white/15 bg-gradient-to-r from-white/6 via-white/5 to-white/8 p-4 xs:p-5 sm:p-6 lg:p-8 backdrop-blur-xl">
            <div className="flex flex-col gap-3 xs:gap-4 sm:gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <p className="text-xs xs:text-sm sm:text-base font-semibold text-white/90">Built like a premium SaaS</p>
                <p className="text-xs sm:text-sm text-white/60 mt-1 xs:mt-1.5 leading-relaxed">
                  JWT auth, caching, rate limiting, charts, alerts, favorites, and admin analytics—all ready for deployment.
                </p>
              </div>
              <div className="flex flex-col xs:flex-col sm:flex-row gap-2 xs:gap-2.5 sm:gap-3 flex-shrink-0 w-full xs:w-auto">
                <Link
                  to="/login"
                  className="inline-flex min-h-10 xs:min-h-11 sm:min-h-12 items-center justify-center rounded-lg xs:rounded-lg sm:rounded-xl bg-cyan-400 px-4 xs:px-5 sm:px-6 text-xs xs:text-xs sm:text-sm font-bold text-slate-950 shadow-premium shadow-cyan-400/20 transition duration-300 ease-smooth hover:-translate-y-0.5 hover:bg-cyan-300 hover:shadow-premium-lg hover:shadow-cyan-400/50 active:scale-95 touch:active:scale-[0.98]"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="inline-flex min-h-10 xs:min-h-11 sm:min-h-12 items-center justify-center rounded-lg xs:rounded-lg sm:rounded-xl border border-white/18 bg-white/5 px-4 xs:px-5 sm:px-6 text-xs xs:text-xs sm:text-sm font-semibold text-white/90 transition duration-300 ease-smooth hover:-translate-y-0.5 hover:bg-white/10 hover:border-white/25 active:scale-95 touch:active:scale-[0.98]"
                >
                  Create account
                </Link>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  )
}

export default Home
