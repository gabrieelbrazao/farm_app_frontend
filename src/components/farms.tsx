import { Button, Grid } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import FarmModal from './farmModal'
import { Container, ButtonContainer } from '../styles/components/farms'
import FarmCard from '../components/farmCard'
import { RootState } from '../store'

const Farms: React.FC = () => {
  const { FARMS } = useSelector((state: RootState) => state)
  const dispatch = useDispatch()

  const handleOpenNewFarm = () => {
    dispatch({ type: 'SET_NEW_FARM' })
    dispatch({ type: 'SET_OPEN_MODAL_NEW_FARM', status: true })
  }

  return (
    <Container>
      <ButtonContainer>
        <Button
          color="primary"
          variant="contained"
          size="large"
          startIcon={<Add />}
          onClick={() => handleOpenNewFarm()}
        >
          Adicionar Fazenda
        </Button>
      </ButtonContainer>

      <Grid container item xs={12} justify="space-evenly">
        {FARMS.map(({ producer_name, farm_name, id }) => (
          <Grid item xs={12} md={6} lg={4} xl={3} key={id}>
            <FarmCard
              producerName={producer_name}
              farmName={farm_name}
              id={id}
            />
          </Grid>
        ))}
      </Grid>

      <FarmModal />
    </Container>
  )
}

export default Farms
