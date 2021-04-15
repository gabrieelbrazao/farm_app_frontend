import {
  Button,
  Chip,
  Divider,
  IconButton,
  Modal,
  Paper,
  TextField,
  Typography,
  useTheme
} from '@material-ui/core'
import Fade from '@material-ui/core/Fade'
import { Close } from '@material-ui/icons'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import api from '../services/api'
import { RootState } from '../store'
import { Row } from '../styles/components/farmModal'
import CultureInput from './CultureInput'
import constraints from '../utils/constraints'
import validate from 'validate.js'
import ErrorsModal from './ErrorsModal'

const FarmModal: React.FC = () => {
  const theme = useTheme()
  const currentCulture = useRef<any>('')
  const [errors, setErrors] = useState([])
  const [openErrorsModal, setOpenErrorsModal] = useState(false)
  const dispatch = useDispatch()
  const {
    CULTURES,
    FARM_ID,
    CNPJCPF,
    PRODUCER_NAME,
    FARM_NAME,
    TOTAL_AREA,
    ARABLE_AREA,
    VEGETATION_AREA,
    CITY,
    STATE,
    OPEN_MODAL_NEW_FARM
  } = useSelector((state: RootState) => state)

  const handleCancelNewFarm = () => {
    dispatch({ type: 'SET_OPEN_MODAL_NEW_FARM', status: false })
  }

  const handleAddCulture = () => {
    const key = CULTURES.length
    const label = currentCulture.current.getElementsByTagName('input')[0].value

    dispatch({ type: 'ADD_CULTURE', key, label })

    currentCulture.current.getElementsByTagName('input')[0].value = ''
  }

  const handleDeleteCulture = (key: number) => {
    dispatch({ type: 'REMOVE_CULTURE', key })
  }

  const handleSaveFarm = async () => {
    const {
      cnpjCpf,
      producerName,
      farmName,
      totalArea,
      arableArea,
      vegetationArea,
      city,
      state
    } =
      validate(
        {
          cnpjCpf: CNPJCPF,
          producerName: PRODUCER_NAME,
          farmName: FARM_NAME,
          totalArea: TOTAL_AREA,
          arableArea: ARABLE_AREA,
          vegetationArea: VEGETATION_AREA,
          city: CITY,
          state: STATE
        },
        constraints,
        {
          fullMessages: false
        }
      ) || {}

    const culturesError =
      CULTURES.length === 0 ? 'Por favor, insira pelo menos uma cultura.' : null

    const areaError =
      parseFloat(ARABLE_AREA) + parseFloat(VEGETATION_AREA) > TOTAL_AREA
        ? 'Área total não pode ser menor que a soma das áreas agricultável e de vegetação.'
        : null

    if (
      cnpjCpf ||
      producerName ||
      farmName ||
      totalArea ||
      arableArea ||
      vegetationArea ||
      city ||
      state ||
      culturesError ||
      areaError
    ) {
      setErrors([
        ...(cnpjCpf || []),
        ...(producerName || []),
        ...(farmName || []),
        ...(totalArea || []),
        ...(arableArea || []),
        ...(vegetationArea || []),
        ...(city || []),
        ...(state || []),
        ...([culturesError] || []),
        ...([areaError] || [])
      ])

      setOpenErrorsModal(true)

      return
    }

    dispatch({ type: 'SET_OPEN_MODAL_NEW_FARM', status: false })

    const cultures = CULTURES.map(culture => culture.label)

    await api.post('/producers', {
      id: FARM_ID,
      cpf: CNPJCPF.length === 11 ? CNPJCPF : '',
      cnpj: CNPJCPF.length === 14 ? CNPJCPF : '',
      producerName: PRODUCER_NAME,
      farmName: FARM_NAME,
      city: CITY,
      state: STATE,
      totalArea: TOTAL_AREA,
      arableArea: ARABLE_AREA,
      vegetationArea: VEGETATION_AREA,
      cultures
    })

    const { data } = await api.get('/producers')

    dispatch({ type: 'SET_FARMS', data: data.data })
  }

  return (
    <>
      <Modal
        open={OPEN_MODAL_NEW_FARM}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Fade in={OPEN_MODAL_NEW_FARM}>
          <div
            style={{
              backgroundColor: theme.palette.background.paper,
              padding: 64,
              outline: 'none',
              width: '70vw',
              position: 'relative'
            }}
          >
            <IconButton
              aria-label="Fechar modal"
              onClick={() =>
                dispatch({ type: 'SET_OPEN_MODAL_NEW_FARM', status: false })
              }
              style={{ position: 'absolute', top: 0, right: 0 }}
            >
              <Close />
            </IconButton>

            <div
              style={{
                maxHeight: '80vh'
              }}
            >
              <Row>
                <TextField
                  label="CNPJ/CPF"
                  variant="outlined"
                  value={CNPJCPF}
                  type="number"
                  onChange={e =>
                    dispatch({ type: 'SET_CNPJCPF', value: e.target.value })
                  }
                />
                <TextField
                  label="Nome do produtor"
                  variant="outlined"
                  value={PRODUCER_NAME}
                  onChange={e =>
                    dispatch({
                      type: 'SET_PRODUCER_NAME',
                      value: e.target.value
                    })
                  }
                />
                <TextField
                  label="Nome da fazenda"
                  variant="outlined"
                  value={FARM_NAME}
                  onChange={e =>
                    dispatch({ type: 'SET_FARM_NAME', value: e.target.value })
                  }
                />
              </Row>

              <Row>
                <TextField
                  label="Área total"
                  variant="outlined"
                  value={TOTAL_AREA}
                  type="number"
                  onChange={e =>
                    dispatch({ type: 'SET_TOTAL_AREA', value: e.target.value })
                  }
                />
                <TextField
                  label="Área agricultável"
                  variant="outlined"
                  value={ARABLE_AREA}
                  type="number"
                  onChange={e =>
                    dispatch({ type: 'SET_ARABLE_AREA', value: e.target.value })
                  }
                />
                <TextField
                  label="Área de vegetação"
                  variant="outlined"
                  value={VEGETATION_AREA}
                  type="number"
                  onChange={e =>
                    dispatch({
                      type: 'SET_VEGETATION_AREA',
                      value: e.target.value
                    })
                  }
                />
              </Row>

              <Row>
                <TextField
                  label="Cidade"
                  variant="outlined"
                  value={CITY}
                  onChange={e =>
                    dispatch({ type: 'SET_CITY', value: e.target.value })
                  }
                />
                <TextField
                  label="Estado"
                  variant="outlined"
                  value={STATE}
                  onChange={e =>
                    dispatch({ type: 'SET_STATE', value: e.target.value })
                  }
                />
              </Row>

              <Divider />

              <Typography variant="h4" align="center" style={{ marginTop: 32 }}>
                CULTURAS
              </Typography>

              <Paper
                component="ul"
                style={{ boxShadow: 'none', margin: '32px 0' }}
              >
                <li
                  style={{
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  {CULTURES.map(data => (
                    <Chip
                      label={data.label}
                      onDelete={() => handleDeleteCulture(data.key)}
                      key={data.key}
                      style={{ margin: '0 8px' }}
                    />
                  ))}
                </li>
              </Paper>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: 16
                }}
              >
                <CultureInput
                  addCulture={handleAddCulture}
                  currentCulture={currentCulture}
                />
              </div>
            </div>

            <div style={{ position: 'absolute', right: 24, bottom: 24 }}>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                style={{ marginRight: 24 }}
                onClick={() => handleCancelNewFarm()}
              >
                CANCELAR
              </Button>

              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => handleSaveFarm()}
              >
                SALVAR
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>

      <ErrorsModal
        openDialog={openErrorsModal}
        setOpenDialog={setOpenErrorsModal}
        errors={errors}
      />
    </>
  )
}

export default FarmModal
