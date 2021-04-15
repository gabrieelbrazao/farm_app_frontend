import styled from 'styled-components'
import { Grid } from '@material-ui/core'
import theme from '../theme'

export const Container = styled(Grid)`
  min-height: 100vh;
  padding: 32px;
  background-color: ${theme.palette.background.default};
`

export const PieChartContainer = styled(Grid)`
  margin-top: 64px !important;
`
