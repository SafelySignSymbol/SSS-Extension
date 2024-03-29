import {
  FilledInput,
  FormControl,
  Input,
  InputLabel,
  OutlinedInput,
} from '@mui/material'
import { Dispatch } from 'react'

export interface Props {
  label: string
  variant?: 'outlined' | 'text' | 'filled'
  setText: Dispatch<string>
}
const TextField: React.VFC<Props> = ({
  label,
  setText,
  variant = 'outlined',
  ...props
}) => {
  if (variant === 'text') {
    return (
      <FormControl sx={{ m: 1 }} variant="outlined">
        <InputLabel>{label}</InputLabel>
        <Input onChange={(e) => setText(e.target.value)} />
      </FormControl>
    )
  }
  if (variant === 'filled') {
    return (
      <FormControl sx={{ m: 1 }} variant="outlined">
        <InputLabel>{label}</InputLabel>
        <FilledInput onChange={(e) => setText(e.target.value)} />
      </FormControl>
    )
  }

  return (
    <FormControl sx={{ m: 1 }} variant="outlined">
      <InputLabel>{label}</InputLabel>
      <OutlinedInput label={label} onChange={(e) => setText(e.target.value)} />
    </FormControl>
  )
}
interface InactiveTextFieldProps {
  label: string
  value: string
  variant?: 'outlined' | 'text' | 'filled'
}
export const InactiveTextField: React.FC<InactiveTextFieldProps> = ({
  label,
  value,
  variant = 'outlined',
}) => {
  if (variant === 'text') {
    return (
      <FormControl sx={{ m: 1 }} variant="outlined">
        <InputLabel>{label}</InputLabel>
        <Input value={value} disabled />
      </FormControl>
    )
  }
  if (variant === 'filled') {
    return (
      <FormControl sx={{ m: 1 }} variant="outlined">
        <InputLabel>{label}</InputLabel>
        <FilledInput value={value} disabled />
      </FormControl>
    )
  }

  return (
    <FormControl sx={{ m: 1 }} variant="outlined">
      <InputLabel>{label}</InputLabel>
      <OutlinedInput value={value} disabled />
    </FormControl>
  )
}

export default TextField
