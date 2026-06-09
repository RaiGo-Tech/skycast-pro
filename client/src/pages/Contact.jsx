import { Link } from 'react-router-dom'
import { FiGithub, FiMail, FiMapPin, FiMessageCircle } from 'react-icons/fi'
import { Card, SectionHeader } from '../components/ui/Card'

const contacts = [
  { icon: FiMail, title: 'Project Team', value: 'skycast.team@example.com', href: 'mailto:skycast.team@example.com' },
  { icon: FiGithub, title: 'Repository', value: 'MERN weather application source code', href: null },
  { icon: FiMapPin, title: 'Demo Location', value: 'Mumbai weather workspace by default', href: '/weather?city=Mumbai' },
]

const Contact = () => (
  <div className="stack-grid gap-6">
    <section className="insight-band">
      <div>
        <h1 className="text-3xl font-black text-white sm:text-5xl">Contact and project handoff.</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/68 sm:text-base">
          Use this page for project demos, repository notes, deployment questions, and presentation-ready handoff details.
        </p>
      </div>
      <Link
        to="/weather"
        className="inline-flex min-h-11 w-fit items-center justify-center gap-2 rounded-lg bg-cyan-300 px-5 text-sm font-black text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-200"
      >
        <FiMessageCircle aria-hidden="true" />
        Open live forecast
      </Link>
    </section>

    <Card>
      <SectionHeader title="Contact Channels" action="SkyCast Pro" />
      <div className="grid gap-4 md:grid-cols-3">
        {contacts.map((item) => {
          const Icon = item.icon
          const content = (
            <>
              <Icon className="mb-4 h-7 w-7 text-cyan-100" aria-hidden="true" />
              <h2 className="font-black text-white">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-white/66">{item.value}</p>
            </>
          )

          if (item.href?.startsWith('mailto:')) {
            return (
              <a key={item.title} href={item.href} className="rounded-lg bg-white/9 p-4 transition hover:bg-white/14">
                {content}
              </a>
            )
          }

          if (item.href) {
            return (
              <Link key={item.title} to={item.href} className="rounded-lg bg-white/9 p-4 transition hover:bg-white/14">
                {content}
              </Link>
            )
          }

          return (
            <div key={item.title} className="rounded-lg bg-white/9 p-4">
              {content}
            </div>
          )
        })}
      </div>
    </Card>
  </div>
)

export default Contact
