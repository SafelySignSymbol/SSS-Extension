import React, { Dispatch } from 'react'
import styled from '@emotion/styled'

import TextField from '../../_general/components/TextField'
import PasswordTextField from '../../_general/components/TextField/PasswordTextField'
import Typography from '../../_general/components/Typography'
import { useTranslation } from 'react-i18next'

export type Props = {
  setName: Dispatch<string>
  setAddress: Dispatch<string>
  setPrivateKey: Dispatch<string>
  setPassword: Dispatch<string>
}

const Component: React.FC<Props> = ({
  setName,
  setAddress,
  setPrivateKey,
  setPassword,
}) => {
  const [t] = useTranslation()
  return (
    <Root>
      <Center>
        <Typography fontSize={24} text={t('accmodal_import_input')} />
      </Center>
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
const Center = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  '> *': {
    margin: '4px',
  },
})
