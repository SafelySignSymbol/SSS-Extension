import React, { Dispatch } from 'react'
import styled from '@emotion/styled'

import { Method } from './AccountModal'
import TextField from '../../_general/components/TextField'
import PasswordTextField from '../../_general/components/TextField/PasswordTextField'

export type Props = {
  setMethod: Dispatch<Method>
  setState: Dispatch<number>
  setName: Dispatch<string>
  setAddress: Dispatch<string>
  setPrivateKey: Dispatch<string>
  setPassword: Dispatch<string>
}

const Component: React.FC<Props> = ({
  setMethod,
  setState,
  setName,
  setAddress,
  setPrivateKey,
  setPassword,
}) => {
  return (
    <Root>
      <TextField label="Name" setText={setName} variant="text" />
      <TextField label="Address" setText={setAddress} variant="text" />
      <TextField label="PrivateKey" setText={setPrivateKey} variant="text" />
      <PasswordTextField label="Password" setPass={setPassword} />
    </Root>
  )
}

export default Component

const Root = styled('div')({
  width: 'calc(100% - 32px)',
  height: '400px',
  display: 'flex',
  flexDirection: 'column',
})
