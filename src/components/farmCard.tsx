import { IconButton, Typography } from '@material-ui/core'
import { Create, Delete } from '@material-ui/icons'
import { useDispatch } from 'react-redux'
import api from '../services/api'
import { FarmsContainer, StyledCard } from '../styles/components/farmCard'

interface Iprops {
  producerName: string
  farmName: string
  id: string
}

const FarmCard: React.FC<Iprops> = ({ producerName, farmName, id }) => {
  const dispatch = useDispatch()

  const handleRemoveFarm = () => {
    dispatch({ type: 'REMOVE_FARM', id })

    api.delete(`/producers/${id}`)
  }

  const handleUpdateFarm = async () => {
    const response = await api.get(`/producers/${id}`)

    const data = response.data.data[0]

    const cultures = data.cultures.map((label, key) => ({ key, label }))

    dispatch({
      type: 'UPDATE_FARM',
      id: data.id,
      cpf: data.cpf,
      cnpj: data.cnpj,
      producer_name: data.producer_name,
      farm_name: data.farm_name,
      city: data.city,
      state: data.state,
      total_area: data.total_area,
      arable_area: data.arable_area,
      vegetation_area: data.vegetation_area,
      cultures
    })

    dispatch({ type: 'SET_OPEN_MODAL_NEW_FARM', status: true })
  }

  return (
    <FarmsContainer>
      <StyledCard>
        <Typography variant="h6" align="center">
          {producerName}
        </Typography>

        <Typography variant="h5" align="center">
          {farmName}
        </Typography>

        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-around'
          }}
        >
          <IconButton
            color="secondary"
            aria-label="Excluir Fazenda"
            onClick={() => handleRemoveFarm()}
          >
            <Delete style={{ fontSize: 48 }} />
          </IconButton>

          <IconButton
            color="primary"
            aria-label="Editar Fazenda"
            onClick={() => handleUpdateFarm()}
          >
            <Create style={{ fontSize: 48 }} />
          </IconButton>
        </div>
      </StyledCard>
    </FarmsContainer>
  )
}

export default FarmCard
