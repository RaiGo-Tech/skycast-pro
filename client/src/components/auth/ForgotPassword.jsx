import { useState } from 'react'
import toast from 'react-hot-toast'
import { FiMail } from 'react-icons/fi'
import { authService } from '../../services/authService'
import { isEmail } from '../../utils/validators'
import { Button } from '../ui/Button'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (event) => {
    event.preventDefault()

    if (!isEmail(email)) {
      toast.error('Enter a valid email')
      return
    }

    setLoading(true)
    try {
      await authService.resetPassword(email)
      toast.success(`Reset link sent to ${email}`)
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="space-y-3" onSubmit={submit}>
      <label className="block">
        <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-white/78">
          <FiMail aria-hidden="true" />
          Email
        </span>
        <input className="field" value={email} onChange={(event) => setEmail(event.target.value)} />
      </label>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Sending...' : 'Send reset link'}
      </Button>
    </form>
  )
}

export default ForgotPassword
