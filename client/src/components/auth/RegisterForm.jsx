import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { FiMail, FiLock, FiUserPlus, FiUser } from 'react-icons/fi'
import { useAuth } from '../../hooks/useAuth'
import { isEmail, isStrongEnoughPassword } from '../../utils/validators'
import { Button } from '../ui/Button'
import SocialAuthButtons from './SocialAuthButtons'

const RegisterForm = () => {
  const navigate = useNavigate()
  const { authAction, register, loading } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const emailRegisterLoading = loading && authAction === 'email-register'

  const submit = async (event) => {
    event.preventDefault()
    if (!form.name.trim()) {
      toast.error('Enter your name')
      return
    }
    if (!isEmail(form.email) || !isStrongEnoughPassword(form.password)) {
      toast.error('Use a valid email and 6+ character password')
      return
    }
    try {
      const response = await register(form)
      navigate(response.data.token ? '/dashboard' : '/login')
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <SocialAuthButtons email={form.email} name={form.name} />
      <label className="block">
        <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-white/78">
          <FiUser aria-hidden="true" />
          Name
        </span>
        <input className="field" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
      </label>
      <label className="block">
        <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-white/78">
          <FiMail aria-hidden="true" />
          Email
        </span>
        <input className="field" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
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
        />
      </label>
      <Button type="submit" className="w-full" disabled={loading}>
        <FiUserPlus aria-hidden="true" />
        {emailRegisterLoading ? 'Creating account...' : 'Register'}
      </Button>
      <p className="text-center text-sm text-white/70">
        Already registered? <Link className="font-bold text-cyan-200" to="/login">Login</Link>
      </p>
    </form>
  )
}

export default RegisterForm
