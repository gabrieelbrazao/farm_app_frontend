import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  IconButton
} from '@material-ui/core'
import { Check } from '@material-ui/icons'
import { MutableRefObject } from 'react'

interface IProps {
  addCulture: () => void
  currentCulture: MutableRefObject<string>
}

const CultureInput: React.FC<IProps> = ({ addCulture, currentCulture }) => {
  return (
    <FormControl variant="outlined">
      <InputLabel>Adicionar cultura</InputLabel>

      <OutlinedInput
        labelWidth={123}
        ref={currentCulture}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="Excluir cultura"
              edge="end"
              onClick={() => addCulture()}
            >
              <Check />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  )
}

export default CultureInput
