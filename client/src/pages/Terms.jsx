import { Card, SectionHeader } from '../components/ui/Card'

const Terms = () => (
  <Card>
    <SectionHeader title="Terms" />
    <p className="leading-7 text-white/78">
      This college project is for educational use. Live weather data depends on your configured weather API provider,
      and demo fallback data is included for presentations without internet or API keys.
    </p>
  </Card>
)

export default Terms
