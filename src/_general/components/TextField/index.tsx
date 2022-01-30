import OutlinedInput from '@mui/material/OutlinedInput'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import React, { Ref } from 'react'

export type Props = {
  inputRef: Ref<HTMLInputElement>
  text: string
  type?: string
}

const Component: React.VFC<Props> = ({
  inputRef,
  text,
  type = 'text',
  ...args
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel htmlFor="outlined-adornment-password">{text}</InputLabel>
      <OutlinedInput
        {...args}
        fullWidth
        label={text}
        inputRef={inputRef}
        type={type}
      />
    </FormControl>
  )
}

export default Component
