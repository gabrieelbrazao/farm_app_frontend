import { createStore } from 'redux'

const INITIAL_STATE = {
  TAB: 1,
  CULTURES: [],
  FARMS: [],
  FARM_ID: '',
  CNPJCPF: '',
  PRODUCER_NAME: '',
  FARM_NAME: '',
  TOTAL_AREA: '',
  ARABLE_AREA: '',
  VEGETATION_AREA: '',
  CITY: '',
  STATE: '',
  OPEN_MODAL_NEW_FARM: false
}

function ROOT_REDUCER(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_TAB_1':
      return { ...state, TAB: 1 }
    case 'SET_TAB_2':
      return { ...state, TAB: 2 }
    case 'SET_NEW_FARM':
      return {
        ...INITIAL_STATE,
        TAB: state.TAB,
        FARMS: state.FARMS
      }
    case 'ADD_CULTURE':
      return {
        ...state,
        CULTURES: [...state.CULTURES, { key: action.key, label: action.label }]
      }
    case 'REMOVE_CULTURE':
      return {
        ...state,
        CULTURES: state.CULTURES.filter(culture => culture.key !== action.key)
      }
    case 'SET_CULTURES':
      return { ...state, CULTURES: [action.array] }
    case 'UPDATE_FARM':
      return {
        ...state,
        FARM_ID: action.id,
        CNPJCPF: !action.cpf ? action.cnpj : action.cpf,
        PRODUCER_NAME: action.producer_name,
        FARM_NAME: action.farm_name,
        TOTAL_AREA: action.total_area,
        ARABLE_AREA: action.arable_area,
        VEGETATION_AREA: action.vegetation_area,
        CITY: action.city,
        STATE: action.state,
        CULTURES: action.cultures
      }
    case 'REMOVE_FARM':
      return {
        ...state,
        FARMS: state.FARMS.filter(value => value.id !== action.id)
      }
    case 'SET_FARMS':
      return { ...state, FARMS: action.data }
    case 'SET_CNPJCPF':
      return { ...state, CNPJCPF: action.value }
    case 'SET_PRODUCER_NAME':
      return { ...state, PRODUCER_NAME: action.value }
    case 'SET_FARM_NAME':
      return { ...state, FARM_NAME: action.value }
    case 'SET_TOTAL_AREA':
      return { ...state, TOTAL_AREA: action.value }
    case 'SET_ARABLE_AREA':
      return { ...state, ARABLE_AREA: action.value }
    case 'SET_VEGETATION_AREA':
      return { ...state, VEGETATION_AREA: action.value }
    case 'SET_CITY':
      return { ...state, CITY: action.value }
    case 'SET_STATE':
      return { ...state, STATE: action.value }
    case 'SET_FARM_ID':
      return { ...state, FARM_ID: action.value }
    case 'SET_OPEN_MODAL_NEW_FARM':
      return { ...state, OPEN_MODAL_NEW_FARM: action.status }
    default:
      return state
  }
}

const store = createStore(ROOT_REDUCER)

export default store

export type RootState = ReturnType<typeof store.getState>
