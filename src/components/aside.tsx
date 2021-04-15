import {
  ListItemIcon,
  ListItemText,
  List,
  ListItem,
  Typography
} from '@material-ui/core'
import { Home, Pets } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { Container, TitleDiv } from '../styles/components/aside'
import { RootState } from '../store'

const Aside: React.FC = () => {
  const { TAB } = useSelector((state: RootState) => state)
  const dispatch = useDispatch()

  return (
    <Container>
      <TitleDiv>
        <Typography variant="h4">Farm App</Typography>
      </TitleDiv>

      <List component="nav" aria-label="Navegador">
        <ListItem
          button
          selected={TAB === 1}
          onClick={() => dispatch({ type: 'SET_TAB_1' })}
        >
          <ListItemIcon>
            <Home color={TAB === 1 ? 'primary' : 'secondary'} />
          </ListItemIcon>

          <ListItemText primary="Início" />
        </ListItem>

        <ListItem
          button
          selected={TAB === 2}
          onClick={() => dispatch({ type: 'SET_TAB_2' })}
        >
          <ListItemIcon>
            <Pets color={TAB === 2 ? 'primary' : 'secondary'} />
          </ListItemIcon>

          <ListItemText primary="Fazendas" />
        </ListItem>
      </List>
    </Container>
  )
}

export default Aside
