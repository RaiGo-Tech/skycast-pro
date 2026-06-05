import { Link } from 'react-router-dom'

const NotFound = () => (
  <main className="form-shell app-bg">
    <section className="form-card glass-panel text-center text-white">
      <h1 className="text-6xl font-black">404</h1>
      <p className="mb-6 mt-3 text-white/68">This forecast route drifted off the map.</p>
      <Link
        to="/"
        className="inline-flex min-h-10 items-center justify-center rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
        Back to dashboard
      </Link>
    </section>
  </main>
)

export default NotFound
