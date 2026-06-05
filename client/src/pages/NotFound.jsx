import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'

const NotFound = () => {
  const reduceMotion = useReducedMotion()

  return (
    <main className="form-shell app-bg">
      <motion.section
        className="form-card glass-panel text-center text-white"
        initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.98 }}
        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.34, ease: [0.4, 0, 0.2, 1] }}
      >
        <h1 className="text-6xl font-black">404</h1>
        <p className="mb-6 mt-3 text-white/68">This forecast route drifted off the map.</p>
        <Link
          to="/"
          className="inline-flex min-h-10 items-center justify-center rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-300"
        >
          Back to dashboard
        </Link>
      </motion.section>
    </main>
  )
}

export default NotFound
