import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  'purple',
  'Pink',
  'Orange',
  'red',
]

const Piechart = props => {
  const lezend = props
  const data = lezend.pieLanguages

  return (
    <ResponsiveContainer width="80%" height={300}>
      <PieChart>
        <Pie
          cx="50%"
          cy="50%"
          data={data}
          startAngle={0}
          endAngle={360}
          innerRadius="40%"
          outerRadius="70%"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell
              key={data.name + data.value}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Legend
          iconType="square"
          layout="vertical"
          verticalAlign="middle"
          align="right"
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
export default Piechart
