import { FiGithub, FiMail } from 'react-icons/fi'
import { Card, SectionHeader } from '../components/ui/Card'

const Contact = () => (
  <Card>
    <SectionHeader title="Contact" />
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-lg bg-white/10 p-4">
        <FiMail className="mb-3 text-cyan-100" aria-hidden="true" />
        <h2 className="font-bold text-white">Project Team</h2>
        <p className="mt-1 text-white/68">skycast.team@example.com</p>
      </div>
      <div className="rounded-lg bg-white/10 p-4">
        <FiGithub className="mb-3 text-cyan-100" aria-hidden="true" />
        <h2 className="font-bold text-white">Repository</h2>
        <p className="mt-1 text-white/68">MERN weather application source code</p>
      </div>
    </div>
  </Card>
)

export default Contact
