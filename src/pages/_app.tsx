import { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import { Provider } from 'react-redux'
import store from '../store'

import GlobalStyle from '../styles/global'
import theme from '../styles/theme'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MuiThemeProvider theme={theme}>
          <Component {...pageProps} />
          <GlobalStyle />
        </MuiThemeProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp
