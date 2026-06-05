import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const RainfallChart = ({ data = [] }) => (
  <ResponsiveContainer width="100%" height={160} minWidth={0}>
    <BarChart data={data} margin={{ top: 10, right: 8, bottom: 0, left: -24 }}>
      <XAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.64)', fontSize: 11 }} tickLine={false} axisLine={false} />
      <YAxis tick={{ fill: 'rgba(255,255,255,0.64)', fontSize: 11 }} tickLine={false} axisLine={false} />
      <Tooltip cursor={{ fill: 'rgba(255,255,255,0.06)' }} />
      <Bar dataKey="rainProbability" fill="#5eead4" radius={[6, 6, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
)

export default RainfallChart
