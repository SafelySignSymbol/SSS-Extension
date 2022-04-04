import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from '@mui/material'
import { Dispatch } from 'react'
import { VisibilityOff, Visibility } from '@mui/icons-material'

interface Props {
  label: string
  isVisible: boolean
  autoFocus?: boolean
  updateIsVisible: () => void
  setPass: Dispatch<string>
}

const PasswordTextField: React.VFC<Props> = ({
  label,
  isVisible,
  autoFocus = false,
  updateIsVisible,
  setPass,
  ...props
}) => {
  return (
    <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
      <InputLabel>{label}</InputLabel>
      <OutlinedInput
        type={isVisible ? 'text' : 'password'}
        onChange={(e) => setPass(e.target.value)}
        autoFocus={autoFocus}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={updateIsVisible}
              onMouseDown={updateIsVisible}
              edge="end">
              {isVisible ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
    </FormControl>
  )
}

export default PasswordTextField
