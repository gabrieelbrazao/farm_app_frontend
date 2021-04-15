import { Grid, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ChartCard from '../components/chartCard'
import PieChart from '../components/pieChart'
import { RootState } from '../store'
import { Container, PieChartContainer } from '../styles/components/home'

const Home: React.FC = () => {
  const { FARMS } = useSelector((state: RootState) => state)
  const [cultureData, setCultureData] = useState([])
  const [stateData, setStateData] = useState([])
  const [soilUseData, setSoilUseData] = useState([])
  const [farmsCount, setFarmsCount] = useState(0)
  const [totalAreaCount, setTotalAreaCount] = useState(0)

  useEffect(() => {
    if (FARMS.length === 0) return

    let arableArea = 0
    let vegetationArea = 0
    let totalArea = 0
    const states = []
    const cultures = []
    let totalCultures = 0

    setFarmsCount(FARMS.length)

    FARMS.map(farm => {
      arableArea += farm.arable_area
      vegetationArea += farm.vegetation_area
      totalArea += farm.total_area

      let StateExists = false

      states.map(value => {
        if (value.state === farm.state) {
          StateExists = true

          return {
            ...value,
            count: value.count++
          }
        }
      })

      if (!StateExists) {
        states.push({ state: farm.state, count: 1 })
      }

      farm.cultures.map(culture => {
        let cultureExists = false

        cultures.map(value => {
          if (value.name === culture) {
            cultureExists = true

            return {
              ...value,
              count: value.count++
            }
          }
        })

        if (!cultureExists) {
          cultures.push({ name: culture, count: 1 })
        }

        totalCultures++
      })
    })

    const statesResult = states.map(value => {
      return {
        item: value.state,
        percent: value.count / FARMS.length
      }
    })

    setStateData(statesResult)

    const culturesResult = cultures.map(value => {
      return {
        item: value.name,
        percent: value.count / totalCultures
      }
    })

    setCultureData(culturesResult)

    setStateData(statesResult)

    setTotalAreaCount(totalArea)

    setSoilUseData([
      { item: 'Agricultável', percent: arableArea / totalArea },
      { item: 'Vegetação', percent: vegetationArea / totalArea },
      {
        item: 'Outros',
        percent: (totalArea - (arableArea + vegetationArea)) / totalArea
      }
    ])
  }, [FARMS])

  return (
    <Container container>
      <Grid container justify="space-evenly" alignItems="center">
        <ChartCard
          count={farmsCount}
          description={farmsCount > 1 ? 'Fazendas' : 'Fazenda'}
        />
        <ChartCard
          count={totalAreaCount}
          description={totalAreaCount > 1 ? 'Hectares' : 'Hectare'}
        />
      </Grid>

      <Grid container justify="center">
        <PieChartContainer item xl={4} md={6} sm={12}>
          <Typography variant="h5" align="center">
            CULTURA
          </Typography>

          <PieChart data={cultureData} />
        </PieChartContainer>

        <PieChartContainer item xl={4} md={6} sm={12}>
          <Typography variant="h5" align="center">
            ESTADO
          </Typography>

          <PieChart data={stateData} />
        </PieChartContainer>

        <PieChartContainer item xl={4} md={12} sm={12}>
          <Typography variant="h5" align="center">
            USO DO SOLO
          </Typography>

          <PieChart data={soilUseData} />
        </PieChartContainer>
      </Grid>
    </Container>
  )
}

export default Home
