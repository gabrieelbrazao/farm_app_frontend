import styled from 'styled-components'
import theme from '../theme'

export const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  background-color: ${theme.palette.background.paper};
`

export const ButtonContainer = styled.div`
  height: 20vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
