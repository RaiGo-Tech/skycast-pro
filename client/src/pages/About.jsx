import { Card, SectionHeader } from '../components/ui/Card'

const About = () => (
  <div className="stack-grid">
    <Card>
      <SectionHeader title="About SkyCast Pro" />
      <p className="leading-7 text-white/78">
        SkyCast Pro is a MERN weather platform built for college project presentations. It combines a React dashboard,
        Express APIs, MongoDB models, JWT authentication, weather API integration, AQI, alerts, maps, charts, and PWA-ready setup.
      </p>
    </Card>
    <section className="grid gap-4 md:grid-cols-3">
      {['React + Vite frontend', 'Express + MongoDB backend', 'Live weather API ready'].map((item) => (
        <Card key={item}>
          <h2 className="text-xl font-bold text-white">{item}</h2>
          <p className="mt-2 text-sm text-white/64">Clean, modular, and beginner-friendly code for explanation during viva.</p>
        </Card>
      ))}
    </section>
  </div>
)

export default About
