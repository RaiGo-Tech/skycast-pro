import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { FiMapPin, FiMic, FiSearch, FiX } from 'react-icons/fi'
import { useGeolocation } from '../../hooks/useGeolocation'
import { useWeather } from '../../hooks/useWeather'
import { CITY_SUGGESTIONS } from '../../utils/constants'
import { validateCityQuery } from '../../utils/validators'
import { useDebounce } from '../../hooks/useDebounce'

const SearchBar = () => {
  const { loadWeather, recentSearches } = useWeather()
  const { getLocation, loading: locating } = useGeolocation()
  const [query, setQuery] = useState('Mumbai')
  const [open, setOpen] = useState(false)
  const debouncedQuery = useDebounce(query, 180)

  const suggestions = useMemo(() => {
    const value = debouncedQuery.trim().toLowerCase()
    if (!value) return CITY_SUGGESTIONS.slice(0, 6)
    return CITY_SUGGESTIONS.filter((city) => city.toLowerCase().includes(value)).slice(0, 6)
  }, [debouncedQuery])

  const submitSearch = async (city = query) => {
    if (!validateCityQuery(city)) {
      toast.error('Type at least 2 characters')
      return
    }
    setQuery(city)
    setOpen(false)
    await loadWeather({ city })
  }

  const useCurrentLocation = async () => {
    try {
      const location = await getLocation()
      await loadWeather(location)
      toast.success('Weather updated from your location')
    } catch (err) {
      toast.error(err.message)
    }
  }

  const startVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      toast.error('Voice search is not supported in this browser')
      return
    }
    const recognition = new SpeechRecognition()
    recognition.lang = 'en-IN'
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      submitSearch(transcript)
    }
    recognition.start()
  }

  useEffect(() => {
    const close = (event) => {
      if (!event.target.closest?.('[data-search-root]')) setOpen(false)
    }
    window.addEventListener('click', close)
    return () => window.removeEventListener('click', close)
  }, [])

  return (
    <div className="relative min-w-0 w-full" data-search-root>
      <form
        className="grid min-h-14 grid-cols-[auto_minmax(0,1fr)_auto_auto_auto] items-center gap-1.5 rounded-lg border border-white/18 bg-white/16 px-2.5 text-white shadow-lg backdrop-blur-xl sm:gap-2 sm:px-4"
        onSubmit={(event) => {
          event.preventDefault()
          submitSearch()
        }}
      >
        <FiSearch className="h-5 w-5 flex-none text-cyan-100" aria-hidden="true" />
        <input
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value)
            setOpen(true)
          }}
          className="min-w-0 w-full bg-transparent text-sm font-semibold text-white outline-none placeholder:text-white/48 xs:text-base"
          placeholder="Search city, country, or ZIP code"
          aria-label="Search weather"
        />
        {query ? (
          <button type="button" className="grid h-9 w-9 flex-none place-items-center rounded-lg text-white/70 transition hover:bg-white/12 hover:text-white" onClick={() => setQuery('')} aria-label="Clear search">
            <FiX aria-hidden="true" />
          </button>
        ) : null}
        <button
          type="button"
          className="grid h-9 w-9 flex-none place-items-center rounded-lg text-white/78 transition hover:bg-white/14 hover:text-white"
          onClick={startVoiceSearch}
          aria-label="Voice search"
        >
          <FiMic aria-hidden="true" />
        </button>
        <button
          type="button"
          className="grid h-9 w-9 flex-none place-items-center rounded-lg text-white/78 transition hover:bg-white/14 hover:text-white"
          onClick={useCurrentLocation}
          disabled={locating}
          aria-label="Use current location"
        >
          <FiMapPin aria-hidden="true" />
        </button>
      </form>

      {open ? (
        <div className="absolute left-0 right-0 top-16 z-20 max-h-[min(70vh,24rem)] overflow-y-auto rounded-lg border border-white/18 bg-slate-950/88 p-3 text-white shadow-2xl backdrop-blur-xl">
          <div className="mb-2 text-xs font-semibold uppercase text-white/50">Suggestions</div>
          <div className="grid gap-1">
            {suggestions.map((city) => (
              <button
                type="button"
                key={city}
                className="rounded-lg px-3 py-2 text-left text-sm transition hover:bg-white/12"
                onClick={() => submitSearch(city)}
              >
                {city}
              </button>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2 border-t border-white/10 pt-3">
            {recentSearches.map((city) => (
              <button
                type="button"
                key={city}
                className="rounded-lg bg-white/10 px-3 py-1 text-xs text-white/80 transition hover:bg-white/18"
                onClick={() => submitSearch(city)}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default SearchBar
