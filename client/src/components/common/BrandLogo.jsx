import { Link } from 'react-router-dom'
import logoMark from '../../assets/skycast-pro-mark.svg'

const BrandLogo = ({
  to = '/',
  onClick,
  compact = false,
  className = '',
  markClassName = '',
  textClassName = '',
}) => {
  const content = (
    <>
      <span
        className={`
          grid shrink-0 place-items-center rounded-xl bg-white/92 p-1.5
          shadow-lg shadow-cyan-500/20 ring-1 ring-white/40
          ${compact ? 'h-10 w-10' : 'h-12 w-12'}
          ${markClassName}
        `}
      >
        <img src={logoMark} alt="" className="h-full w-full object-contain" aria-hidden="true" />
      </span>
      <span
        className={`
          min-w-0 text-left font-black leading-tight text-white drop-shadow-sm
          ${compact ? 'text-lg' : 'text-xl'}
          ${textClassName}
        `}
      >
        SkyCast
        <span className="block bg-gradient-to-r from-cyan-200 to-sky-300 bg-clip-text text-[0.82em] text-transparent">
          Pro
        </span>
      </span>
    </>
  )

  const classes = `group inline-flex min-w-0 items-center gap-3 ${className}`

  if (!to) {
    return (
      <div className={classes} aria-label="SkyCast Pro">
        {content}
      </div>
    )
  }

  return (
    <Link to={to} onClick={onClick} className={classes} aria-label="SkyCast Pro home">
      {content}
    </Link>
  )
}

export default BrandLogo
