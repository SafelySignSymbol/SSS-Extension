import {
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  Input,
} from '@mui/material'
import { Dispatch, useState } from 'react'
import { VisibilityOff, Visibility } from '@mui/icons-material'

interface Props {
  label: string
  autoFocus?: boolean
  setPass: Dispatch<string>
}

const PasswordTextField: React.VFC<Props> = ({
  label,
  autoFocus = false,
  setPass,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false)

  const updateIsVisible = () => {
    setIsVisible((prev) => !prev)
  }

  return (
    <FormControl sx={{ m: 1 }} variant="outlined">
      <InputLabel>{label}</InputLabel>
      <Input
        type={isVisible ? 'text' : 'password'}
        onChange={(e) => setPass(e.target.value)}
        autoFocus={autoFocus}
        endAdornment={
          <InputAdornment position="end" sx={{ marginRight: '16px' }}>
            <IconButton
              onClick={updateIsVisible}
              onMouseDown={updateIsVisible}
              edge="end">
              {isVisible ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  )
}

export default PasswordTextField
