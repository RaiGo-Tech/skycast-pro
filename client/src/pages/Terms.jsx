import { FiCloudLightning, FiDatabase, FiShield } from 'react-icons/fi'
import { Card, SectionHeader } from '../components/ui/Card'

const terms = [
  {
    icon: FiCloudLightning,
    title: 'Weather data',
    text: 'Live forecasts depend on the configured weather provider. Demo fallback data is included for presentations and local development.',
  },
  {
    icon: FiShield,
    title: 'User accounts',
    text: 'Authentication and saved history are powered by Supabase when environment variables and provider settings are configured.',
  },
  {
    icon: FiDatabase,
    title: 'Project use',
    text: 'SkyCast Pro is prepared for learning, portfolios, demos, and college project presentations.',
  },
]

const Terms = () => (
  <div className="stack-grid gap-6">
    <section className="insight-band">
      <div>
        <h1 className="text-3xl font-black text-white sm:text-5xl">Terms and project notes.</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/68 sm:text-base">
          A clear summary of how the weather dashboard, account features, and demo data should be used.
        </p>
      </div>
    </section>

    <Card>
      <SectionHeader title="Usage Notes" action="Educational" />
      <div className="grid gap-4 md:grid-cols-3">
        {terms.map((item) => {
          const Icon = item.icon
          return (
            <article key={item.title} className="rounded-lg bg-white/9 p-4">
              <Icon className="mb-4 h-7 w-7 text-cyan-100" aria-hidden="true" />
              <h2 className="text-lg font-black text-white">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-white/66">{item.text}</p>
            </article>
          )
        })}
      </div>
    </Card>
  </div>
)

export default Terms
