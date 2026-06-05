import { useState } from 'react'
import toast from 'react-hot-toast'
import { FiMail } from 'react-icons/fi'
import { Button } from '../ui/Button'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')

  return (
    <form
      className="space-y-3"
      onSubmit={(event) => {
        event.preventDefault()
        toast.success(`Reset instructions prepared for ${email || 'your email'}`)
      }}
    >
      <label className="block">
        <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-white/78">
          <FiMail aria-hidden="true" />
          Email
        </span>
        <input className="field" value={email} onChange={(event) => setEmail(event.target.value)} />
      </label>
      <Button type="submit" className="w-full">Send reset link</Button>
    </form>
  )
}

export default ForgotPassword
