import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { useAuth } from '../../hooks/useAuth'
import { isEmail } from '../../utils/validators'
import { Button } from '../ui/Button'

const LoginForm = () => {
  const navigate = useNavigate()
  const { login, loading } = useAuth()
  const [form, setForm] = useState({ email: 'demo@skycast.dev', password: 'demo123' })

  const submit = async (event) => {
    event.preventDefault()
    if (!isEmail(form.email)) {
      toast.error('Enter a valid email')
      return
    }
    try {
      await login(form)
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <label className="block">
        <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-white/78">
          <FiMail aria-hidden="true" />
          Email
        </span>
        <input
          className="field"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          autoComplete="email"
        />
      </label>
      <label className="block">
        <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-white/78">
          <FiLock aria-hidden="true" />
          Password
        </span>
        <input
          className="field"
          type="password"
          value={form.password}
          onChange={(event) => setForm({ ...form, password: event.target.value })}
          autoComplete="current-password"
        />
      </label>
      <Button type="submit" className="w-full" disabled={loading}>
        <FiLogIn aria-hidden="true" />
        {loading ? 'Signing in...' : 'Login'}
      </Button>
      <p className="text-center text-sm text-white/70">
        New here? <Link className="font-bold text-cyan-200" to="/register">Create account</Link>
      </p>
    </form>
  )
}

export default LoginForm
