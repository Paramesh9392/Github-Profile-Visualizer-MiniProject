import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

const COLORS = [
  'Orange',
  'Pink',
  '#F2637F',
  '#0088FE',
  'yellow',
  '#00C49F',
  'purple',
]

const LanguageCommitCountPie = props => {
  const {langCommitCount} = props
  const data = langCommitCount

  return (
    <ResponsiveContainer width="100%" height={200}>
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

export default LanguageCommitCountPie
