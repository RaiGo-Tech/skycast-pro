import { Link } from 'react-router-dom'
import RegisterForm from '../components/auth/RegisterForm'

const Register = () => (
  <main className="form-shell app-bg">
    <section className="form-card glass-panel text-white">
      <Link to="/" className="mb-6 inline-block text-sm font-semibold text-cyan-100">Back to SkyCast Pro</Link>
      <h1 className="text-3xl font-black">Create Account</h1>
      <p className="mb-6 mt-2 text-white/68">Save favorite cities and personalize weather preferences.</p>
      <RegisterForm />
    </section>
  </main>
)

export default Register
