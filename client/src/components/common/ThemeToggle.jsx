import { useContext } from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'
import { ThemeContext } from '../../context/ThemeContext'

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext)

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/12 text-white transition hover:bg-white/20"
      aria-label="Toggle theme"
    >
      {isDark ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
    </button>
  )
}

export default ThemeToggle
