import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import LoginForm from '../components/auth/LoginForm'
import ForgotPassword from '../components/auth/ForgotPassword'

const Login = () => {
  const reduceMotion = useReducedMotion()

  return (
    <main className="form-shell app-bg">
      <motion.section
        className="form-card glass-panel text-white"
        initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.98 }}
        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.34, ease: [0.4, 0, 0.2, 1] }}
      >
        <Link to="/" className="mb-6 inline-block text-sm font-semibold text-cyan-100 transition hover:text-cyan-50">
          Back to SkyCast Pro
        </Link>
        <h1 className="text-3xl font-black">Login</h1>
        <p className="mb-6 mt-2 text-white/68">Use the demo account or your registered account.</p>
        <LoginForm />
        <div className="mt-6 border-t border-white/12 pt-5">
          <ForgotPassword />
        </div>
      </motion.section>
    </main>
  )
}

export default Login
