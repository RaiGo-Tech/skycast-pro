const variants = {
  primary:
    'bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-950 font-bold shadow-premium shadow-cyan-500/30 hover:shadow-premium-lg hover:shadow-cyan-500/50 hover:scale-[1.02] active:scale-95 dark:text-white transition-all duration-300 ease-smooth touch:active:scale-[0.98]',
  secondary:
    'bg-white/15 text-white hover:bg-white/25 border border-white/20 hover:border-white/40 backdrop-blur-sm transition-all duration-300 ease-smooth touch:active:bg-white/20',
  ghost:
    'bg-transparent text-white hover:bg-white/12 border border-transparent hover:border-white/20 transition-all duration-300 ease-smooth touch:active:bg-white/8',
  danger:
    'bg-gradient-to-r from-red-600 to-red-500 text-white font-bold shadow-premium shadow-red-500/30 hover:shadow-premium-lg hover:shadow-red-500/50 hover:scale-[1.02] active:scale-95 transition-all duration-300 ease-smooth touch:active:scale-[0.98]',
  success:
    'bg-gradient-to-r from-green-600 to-green-500 text-white font-bold shadow-premium shadow-green-500/30 hover:shadow-premium-lg hover:shadow-green-500/50 hover:scale-[1.02] active:scale-95 transition-all duration-300 ease-smooth touch:active:scale-[0.98]',
  warning:
    'bg-gradient-to-r from-amber-600 to-amber-500 text-white font-bold shadow-premium shadow-amber-500/30 hover:shadow-premium-lg hover:shadow-amber-500/50 hover:scale-[1.02] active:scale-95 transition-all duration-300 ease-smooth touch:active:scale-[0.98]',
  outline:
    'border-2 border-cyan-400 text-cyan-400 bg-transparent hover:bg-cyan-400/10 hover:border-cyan-300 transition-all duration-300 ease-smooth touch:active:bg-cyan-400/5',
};

const sizes = {
  xs: 'min-h-7 px-2 py-0.5 text-xs gap-1 rounded-md sm:rounded-md',
  sm: 'min-h-8 px-3 py-1 text-xs sm:text-sm gap-1 rounded-md sm:rounded-lg',
  md: 'min-h-10 px-4 py-2 text-sm sm:text-base gap-2 rounded-lg sm:rounded-lg',
  lg: 'min-h-12 px-5 sm:px-6 py-2.5 sm:py-3 text-base sm:text-lg gap-2 rounded-lg sm:rounded-xl',
  xl: 'min-h-14 px-7 sm:px-8 py-3 sm:py-4 text-lg sm:text-xl gap-3 rounded-xl sm:rounded-2xl',
};

export const Button = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  type = 'button',
  loading = false,
  disabled = false,
  fullWidth = false,
  responsive = true,
  ...props
}) => {
  // Auto-adjust size on mobile
  const finalSize = responsive && size === 'md' ? 'sm' : size;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-1 sm:gap-2 font-semibold
        transition-all duration-300 ease-smooth
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-400
        disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100
        ${sizes[finalSize]}
        ${variants[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {loading && (
        <svg className="h-4 w-4 sm:h-5 sm:w-5 animate-spin flex-shrink-0" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      <span className="hidden xs:inline">{children}</span>
      <span className="inline xs:hidden">{children}</span>
    </button>
  );
};
