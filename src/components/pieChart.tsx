import { Chart, Interval, Tooltip, Axis, Coordinate } from 'bizcharts'

const cols = {
  percent: {
    formatter: (value: number) => {
      return `${value * 100}%`
    }
  }
}

interface IProps {
  data: {
    item: string
    percent: number
  }[]
}

const PieChart: React.FC<IProps> = ({ data }) => {
  return (
    <Chart
      height={400}
      data={data}
      scale={cols}
      autoFit
      interactions={['element-single-selected']}
    >
      <Coordinate type="theta" radius={0.75} />
      <Tooltip showTitle={false} />
      <Axis visible={false} />

      <Interval
        position="percent"
        adjust="stack"
        color="item"
        style={{
          lineWidth: 1,
          stroke: '#fff'
        }}
        label={[
          '*',
          {
            content: data => {
              return `${data.item}: ${parseFloat(
                (data.percent * 100).toString()
              ).toFixed(2)}%`
            }
          }
        ]}
      />
    </Chart>
  )
}

export default PieChart
