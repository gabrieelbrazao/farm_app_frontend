import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#218c74'
    },
    secondary: {
      main: '#aaa69d'
    },
    background: {
      default: '#ecf0f1',
      paper: '#E8ECEE'
    }
  },
  typography: {
    h3: {
      fontWeight: 'bold',
      color: '#218c74'
    },
    h4: {
      fontWeight: 'bold',
      color: '#218c74'
    },
    h5: {
      fontWeight: 'bold',
      color: '#34495e'
    },
    h6: {
      fontWeight: 'bold',
      color: '#34495e'
    }
  }
})

export default theme
