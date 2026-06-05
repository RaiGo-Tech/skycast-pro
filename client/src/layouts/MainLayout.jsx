import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../components/common/Footer'
import Navbar from '../components/common/Navbar'

const MainLayout = () => {
  const location = useLocation()
  const reduceMotion = useReducedMotion()

  return (
    <div className="app-bg">
      <div className="app-shell">
        <div className="dashboard-grid">
          <Navbar />
          <main className="min-w-0 overflow-hidden lg:overflow-visible">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={location.pathname}
                className="min-w-0"
                initial={reduceMotion ? false : { opacity: 0, y: 14, filter: 'blur(8px)' }}
                animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -10, filter: 'blur(6px)' }}
                transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
            <Footer />
          </main>
        </div>
      </div>
    </div>
  )
}

export default MainLayout
