import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

const COLORS = [
  'Pink',
  '#00C49F',
  '#FFBB28',
  '#0088FE',
  '#F2637F',
  'Orange',
  'purple',
]

const RepoCommitCountPie = props => {
  const {repoCommitCount} = props
  const data = repoCommitCount

  return (
    <ResponsiveContainer width="120%" height={200}>
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

export default RepoCommitCountPie
