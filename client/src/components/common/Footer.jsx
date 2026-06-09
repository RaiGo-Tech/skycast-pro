import { Link } from 'react-router-dom'
import { FiCloudLightning, FiGithub, FiMail, FiShield } from 'react-icons/fi'
import BrandLogo from './BrandLogo'

const productLinks = [
  { to: '/', label: 'Overview' },
  { to: '/weather', label: 'Forecast' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/about', label: 'About' },
]

const Footer = () => (
  <footer className="site-footer">
    <div className="site-footer-inner">
      <section className="site-footer-cta">
        <div>
          <h2 className="text-xl font-black text-white sm:text-2xl">Plan your day with sharper weather context.</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/66">
            Search forecasts, save history, revisit favorite cities, and keep alerts close to your dashboard.
          </p>
        </div>
        <Link
          to="/weather"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-cyan-300 px-5 text-sm font-black text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-200"
        >
          <FiCloudLightning aria-hidden="true" />
          Open Forecast
        </Link>
      </section>

      <div className="site-footer-grid">
        <div className="min-w-0">
          <BrandLogo to="/" compact />
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/62">
            SkyCast Pro brings live forecasts, AQI, alerts, maps, saved searches, and dashboard history into one clean weather workspace.
          </p>
        </div>

        <div>
          <h3 className="footer-heading">Product</h3>
          <div className="mt-3 grid gap-2">
            {productLinks.map((link) => (
              <Link key={link.to} to={link.to} className="footer-link">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="footer-heading">Platform</h3>
          <div className="mt-3 grid gap-2 text-sm text-white/62">
            <span>Supabase Auth</span>
            <span>Weather history</span>
            <span>OpenWeather ready</span>
            <span>PWA-friendly frontend</span>
          </div>
        </div>

        <div>
          <h3 className="footer-heading">Connect</h3>
          <div className="mt-3 grid gap-2">
            <a href="mailto:skycast.team@example.com" className="footer-link inline-flex items-center gap-2">
              <FiMail aria-hidden="true" />
              Email team
            </a>
            <Link to="/contact" className="footer-link inline-flex items-center gap-2">
              <FiGithub aria-hidden="true" />
              Project contact
            </Link>
            <Link to="/terms" className="footer-link inline-flex items-center gap-2">
              <FiShield aria-hidden="true" />
              Terms
            </Link>
          </div>
        </div>
      </div>

      <div className="site-footer-bottom">
        <span>SkyCast Pro - Weather intelligence workspace</span>
        <span>Built with React, Express, Supabase, and weather APIs</span>
      </div>
    </div>
  </footer>
)

export default Footer
