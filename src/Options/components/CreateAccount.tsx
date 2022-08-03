import React, { Dispatch } from 'react'
import styled from '@emotion/styled'

import Typography from '../../_general/components/Typography'
import PasswordTextField from '../../_general/components/TextField/PasswordTextField'
import TextField from '../../_general/components/TextField'

export type Props = {
  setName: Dispatch<string>
  address: string
  setPassword: Dispatch<string>
}

const Component: React.FC<Props> = ({ setName, setPassword, address }) => {
  return (
    <Root>
      <Center>
        <Typography variant="h5" text="生成されたアドレス" />
        <Typography variant="h6" text={address} />
      </Center>
      <TextField label="Name" setText={setName} variant="text" />
      <PasswordTextField label="Password" setPass={setPassword} />
    </Root>
  )
}

export default Component

const Root = styled('div')({
  width: 'calc(100% - 32px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
})

const Center = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '16px 0px',
  '> *': {
    margin: '4px',
  },
})
