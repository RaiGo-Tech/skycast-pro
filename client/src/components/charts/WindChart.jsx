import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const WindChart = ({ data = [] }) => (
  <ResponsiveContainer width="100%" height={160} minWidth={0}>
    <AreaChart data={data} margin={{ top: 10, right: 8, bottom: 0, left: -24 }}>
      <defs>
        <linearGradient id="windGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#50d7ff" stopOpacity={0.72} />
          <stop offset="95%" stopColor="#50d7ff" stopOpacity={0.05} />
        </linearGradient>
      </defs>
      <XAxis dataKey="time" tick={{ fill: 'rgba(255,255,255,0.64)', fontSize: 11 }} tickLine={false} axisLine={false} />
      <YAxis tick={{ fill: 'rgba(255,255,255,0.64)', fontSize: 11 }} tickLine={false} axisLine={false} />
      <Tooltip />
      <Area type="monotone" dataKey="windSpeed" stroke="#50d7ff" fill="url(#windGradient)" strokeWidth={2} />
    </AreaChart>
  </ResponsiveContainer>
)

export default WindChart
