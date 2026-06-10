import { motion } from 'framer-motion'

const LoadingSpinner = ({ size = 'md', color = 'cyan', text = 'Loading...', fullScreen = false }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  }

  const colorClasses = {
    cyan: 'border-cyan-400',
    white: 'border-white',
    blue: 'border-blue-400',
  }

  const containerClasses = fullScreen
    ? 'fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'
    : 'flex flex-col items-center justify-center gap-3 p-8'

  return (
    <div className={containerClasses} role="status" aria-label="Loading">
      <motion.div
        className={`border-4 border-t-transparent rounded-full ${sizeClasses[size]} ${colorClasses[color]}`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        aria-hidden="true"
      />
      {text && (
        <motion.p
          className="text-sm text-white/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {text}
        </motion.p>
      )}
    </div>
  )
}

export default LoadingSpinner
