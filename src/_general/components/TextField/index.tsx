import OutlinedInput from '@mui/material/OutlinedInput'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import React, { Ref } from 'react'

export type Props = {
  inputRef: Ref<HTMLInputElement>
  text: string
}

const Component: React.VFC<Props> = ({ inputRef, text, ...args }) => {
  return (
    <FormControl fullWidth>
      <InputLabel htmlFor="outlined-adornment-password">{text}</InputLabel>
      <OutlinedInput {...args} fullWidth label={text} inputRef={inputRef} />
    </FormControl>
  )
}

export default Component
