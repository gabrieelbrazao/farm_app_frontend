import { Card } from '@material-ui/core'
import styled from 'styled-components'

export const FarmsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  margin-bottom: 64px;
`

export const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 320px;
  min-height: 420px;
  padding: 24px;
  background-color: white !important;
`
