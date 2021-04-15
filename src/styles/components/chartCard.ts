import styled from 'styled-components'
import { InsertChart } from '@material-ui/icons'
import { Card } from '@material-ui/core'

export const CardTexts = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-right: 16px;
`

export const Icon = styled(InsertChart)`
  font-size: 128px !important;
`

export const StyledCard = styled(Card)`
  display: flex;
  padding: 12px;
  padding-right: 98px;
  background-color: white !important;
`
