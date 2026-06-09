import { FiBarChart2, FiClock, FiCloudLightning, FiDatabase, FiShield, FiSmartphone } from 'react-icons/fi'
import { Card, SectionHeader } from '../components/ui/Card'

const pillars = [
  { icon: FiCloudLightning, title: 'Weather-first workflow', text: 'Search a place, read live conditions, scan hourly and weekly forecasts, then move straight into alerts and AQI.' },
  { icon: FiDatabase, title: 'Saved context', text: 'Supabase-backed authentication and search history keep repeated weather checks personal and useful.' },
  { icon: FiBarChart2, title: 'Readable analytics', text: 'Charts and metric cards turn humidity, wind, rain probability, and comfort into quick decisions.' },
]

const stack = [
  { icon: FiSmartphone, label: 'React + Vite frontend' },
  { icon: FiShield, label: 'Supabase authentication' },
  { icon: FiClock, label: 'Weather history and recents' },
]

const About = () => (
  <div className="stack-grid gap-6">
    <section className="insight-band">
      <div>
        <h1 className="text-3xl font-black text-white sm:text-5xl">A premium weather workspace, not just a forecast card.</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/68 sm:text-base">
          SkyCast Pro brings live weather, saved searches, account-aware history, AQI, charts, alerts, maps, and favorite cities into one polished dashboard experience.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {stack.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.label} className="rounded-lg border border-white/12 bg-white/8 p-4">
              <Icon className="mb-3 text-cyan-100" aria-hidden="true" />
              <span className="text-sm font-bold text-white">{item.label}</span>
            </div>
          )
        })}
      </div>
    </section>

    <section className="grid gap-4 md:grid-cols-3">
      {pillars.map((item) => {
        const Icon = item.icon
        return (
          <Card key={item.title} hoverable>
            <Icon className="mb-4 h-7 w-7 text-cyan-100" aria-hidden="true" />
            <h2 className="text-xl font-black text-white">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-white/66">{item.text}</p>
          </Card>
        )
      })}
    </section>

    <Card>
      <SectionHeader title="Project Highlights" action="Ready" />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {['Authentication', 'Weather API layer', 'Charts and maps', 'Responsive UI'].map((item) => (
          <div key={item} className="rounded-lg bg-white/9 p-4 text-sm font-bold text-white">
            {item}
          </div>
        ))}
      </div>
    </Card>
  </div>
)

export default About
