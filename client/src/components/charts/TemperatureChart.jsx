import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const TemperatureChart = ({ data = [] }) => (
  <ResponsiveContainer width="100%" height={170} minWidth={0}>
    <LineChart data={data} margin={{ top: 10, right: 8, bottom: 0, left: -24 }}>
      <CartesianGrid stroke="rgba(255,255,255,0.1)" vertical={false} />
      <XAxis dataKey="time" tick={{ fill: 'rgba(255,255,255,0.64)', fontSize: 11 }} tickLine={false} axisLine={false} />
      <YAxis tick={{ fill: 'rgba(255,255,255,0.64)', fontSize: 11 }} tickLine={false} axisLine={false} unit="°" />
      <Tooltip
        contentStyle={{
          background: 'rgba(6, 19, 36, 0.92)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 8,
          color: '#fff',
        }}
      />
      <Line type="monotone" dataKey="temp" stroke="#50d7ff" strokeWidth={3} dot={{ r: 4, fill: '#f5b84b' }} />
    </LineChart>
  </ResponsiveContainer>
)

export default TemperatureChart
