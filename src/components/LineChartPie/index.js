import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts'

const LineChartPie = props => {
  const {linechartDetails} = props
  const data = linechartDetails

  return (
    <LineChart
      width={330}
      height={200}
      data={data}
      margin={{top: 5, right: 100, left: 0, bottom: 0}}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line type="" dataKey="commits" stroke="#8884d8" activeDot={{r: 8}} />
    </LineChart>
  )
}

export default LineChartPie
