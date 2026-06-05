import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export const Input = ({
  label,
  error,
  helperText,
  type = 'text',
  placeholder,
  required = false,
  disabled = false,
  showPasswordToggle = false,
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const currentType = isPassword && showPassword ? 'text' : type;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-white mb-2">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type={currentType}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full px-4 py-3 
            bg-white/10 border border-white/20 
            rounded-lg lg:rounded-xl
            text-white placeholder-white/50
            transition-all duration-200
            focus:outline-none focus:border-cyan-400 focus:bg-white/15 focus:ring-2 focus:ring-cyan-400/30
            hover:border-white/30
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-white/20
            ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-400/30' : ''}
            ${className}
          `}
          {...props}
        />
        {isPassword && showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {showPassword ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
          </button>
        )}
      </div>
      {(error || helperText) && (
        <p className={`text-xs mt-2 ${error ? 'text-red-400' : 'text-white/60'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};

export const Select = ({
  label,
  error,
  helperText,
  options = [],
  required = false,
  disabled = false,
  placeholder = 'Select an option...',
  className = '',
  ...props
}) => (
  <div className="w-full">
    {label && (
      <label className="block text-sm font-semibold text-white mb-2">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
    )}
    <select
      disabled={disabled}
      className={`
        w-full px-4 py-3
        bg-white/10 border border-white/20
        rounded-lg lg:rounded-xl
        text-white placeholder-white/50
        transition-all duration-200
        focus:outline-none focus:border-cyan-400 focus:bg-white/15 focus:ring-2 focus:ring-cyan-400/30
        hover:border-white/30
        disabled:opacity-50 disabled:cursor-not-allowed
        appearance-none bg-no-repeat
        pr-10
        ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-400/30' : ''}
        ${className}
      `}
      {...props}
    >
      <option value="" disabled className="bg-slate-900">
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value} className="bg-slate-900">
          {option.label}
        </option>
      ))}
    </select>
    {(error || helperText) && (
      <p className={`text-xs mt-2 ${error ? 'text-red-400' : 'text-white/60'}`}>
        {error || helperText}
      </p>
    )}
  </div>
);

export const Textarea = ({
  label,
  error,
  helperText,
  required = false,
  disabled = false,
  rows = 4,
  placeholder,
  className = '',
  ...props
}) => (
  <div className="w-full">
    {label && (
      <label className="block text-sm font-semibold text-white mb-2">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
    )}
    <textarea
      rows={rows}
      placeholder={placeholder}
      disabled={disabled}
      className={`
        w-full px-4 py-3
        bg-white/10 border border-white/20
        rounded-lg lg:rounded-xl
        text-white placeholder-white/50
        font-sans
        transition-all duration-200
        focus:outline-none focus:border-cyan-400 focus:bg-white/15 focus:ring-2 focus:ring-cyan-400/30
        hover:border-white/30
        disabled:opacity-50 disabled:cursor-not-allowed
        resize-none
        ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-400/30' : ''}
        ${className}
      `}
      {...props}
    />
    {(error || helperText) && (
      <p className={`text-xs mt-2 ${error ? 'text-red-400' : 'text-white/60'}`}>
        {error || helperText}
      </p>
    )}
  </div>
);

export const Checkbox = ({
  label,
  error,
  required = false,
  disabled = false,
  className = '',
  ...props
}) => (
  <div className="w-full">
    <label className="inline-flex items-center gap-3 cursor-pointer group">
      <input
        type="checkbox"
        disabled={disabled}
        className={`
          w-5 h-5
          rounded border-2 border-white/30
          bg-white/10
          transition-all duration-200
          cursor-pointer
          focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-950
          checked:bg-cyan-400 checked:border-cyan-400
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? 'border-red-400' : ''}
          ${className}
        `}
        {...props}
      />
      {label && (
        <span className="text-sm text-white group-hover:text-white/80 transition-colors">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </span>
      )}
    </label>
    {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
  </div>
);

export const FormGroup = ({ children, className = '' }) => (
  <div className={`space-y-4 sm:space-y-5 lg:space-y-6 ${className}`}>{children}</div>
);

export const FormSection = ({ title, description, children, className = '' }) => (
  <div className={`p-4 sm:p-6 lg:p-8 glass-panel rounded-lg lg:rounded-xl border border-white/10 ${className}`}>
    {title && (
      <div className="mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl font-bold text-white">{title}</h3>
        {description && <p className="text-sm text-white/60 mt-1">{description}</p>}
      </div>
    )}
    <FormGroup>{children}</FormGroup>
  </div>
);
