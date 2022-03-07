import { FormControl, InputLabel, OutlinedInput } from '@mui/material'
import { Dispatch } from 'react'

export interface Props {
  label: string
  setText: Dispatch<string>
}
const TextField: React.VFC<Props> = ({ label, setText, ...props }) => {
  return (
    <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
      <InputLabel>{label}</InputLabel>
      <OutlinedInput label={label} onChange={(e) => setText(e.target.value)} />
    </FormControl>
  )
}

export default TextField
