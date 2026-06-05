import { Link } from 'react-router-dom'
import LoginForm from '../components/auth/LoginForm'
import ForgotPassword from '../components/auth/ForgotPassword'

const Login = () => (
  <main className="form-shell app-bg">
    <section className="form-card glass-panel text-white">
      <Link to="/" className="mb-6 inline-block text-sm font-semibold text-cyan-100">Back to SkyCast Pro</Link>
      <h1 className="text-3xl font-black">Login</h1>
      <p className="mb-6 mt-2 text-white/68">Use the demo account or your registered account.</p>
      <LoginForm />
      <div className="mt-6 border-t border-white/12 pt-5">
        <ForgotPassword />
      </div>
    </section>
  </main>
)

export default Login
