import toast from 'react-hot-toast'
import { FaFacebookF, FaGoogle, FaLinkedinIn } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { FiMail } from 'react-icons/fi'
import { useAuth } from '../../hooks/useAuth'
import { isEmail } from '../../utils/validators'

const providers = [
  { provider: 'google', label: 'Google', icon: FaGoogle, className: 'text-red-300' },
  { provider: 'facebook', label: 'Facebook', icon: FaFacebookF, className: 'text-blue-300' },
  { provider: 'twitter', label: 'Twitter', icon: FaXTwitter, className: 'text-white' },
  { provider: 'linkedin_oidc', label: 'LinkedIn', icon: FaLinkedinIn, className: 'text-sky-300' },
]

const buttonClass =
  'inline-flex min-h-11 min-w-0 items-center justify-center gap-2 rounded-lg border border-white/16 bg-white/10 px-3 py-2 text-xs font-bold text-white transition hover:border-white/28 hover:bg-white/18 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm'

const SocialAuthButtons = ({ email = '', name = '' }) => {
  const { authAction, isSupabaseConfigured, loading, sendMagicLink, signInWithProvider } = useAuth()

  const startProvider = async ({ provider, label }) => {
    if (!isSupabaseConfigured) {
      toast.error('Add Supabase env vars first')
      return
    }

    try {
      await signInWithProvider(provider)
      toast.success(`Opening ${label} sign in`)
    } catch (err) {
      toast.error(err.message)
    }
  }

  const startMagicLink = async () => {
    if (!isSupabaseConfigured) {
      toast.error('Add Supabase env vars first')
      return
    }

    if (!isEmail(email)) {
      toast.error('Enter your email first')
      return
    }

    try {
      await sendMagicLink({ email, name })
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-2 xs:grid-cols-2">
        <button
          type="button"
          className={`${buttonClass} xs:col-span-2`}
          onClick={startMagicLink}
          disabled={loading}
          aria-label="Continue with email link"
        >
          <FiMail className="h-4 w-4 flex-none text-cyan-100" aria-hidden="true" />
          <span className="truncate">{authAction === 'magic-link' ? 'Sending link...' : 'Continue with Mail'}</span>
        </button>

        {providers.map((item) => {
          const Icon = item.icon
          const active = authAction === item.provider

          return (
            <button
              key={item.provider}
              type="button"
              className={buttonClass}
              onClick={() => startProvider(item)}
              disabled={loading}
              aria-label={`Continue with ${item.label}`}
            >
              <Icon className={`h-4 w-4 flex-none ${item.className}`} aria-hidden="true" />
              <span className="truncate">{active ? 'Opening...' : item.label}</span>
            </button>
          )
        })}
      </div>
      <div className="flex items-center gap-3 text-xs font-semibold uppercase text-white/46">
        <span className="h-px flex-1 bg-white/14" />
        <span>Email</span>
        <span className="h-px flex-1 bg-white/14" />
      </div>
    </div>
  )
}

export default SocialAuthButtons
