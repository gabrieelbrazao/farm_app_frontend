import styled from 'styled-components'
import theme from '../theme'

export const Container = styled.div`
  min-width: 248px;
  min-height: 100vh;
  background-color: ${theme.palette.background.paper};
  box-shadow: 1px 1px 10px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
`

export const TitleDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 64px;
`
