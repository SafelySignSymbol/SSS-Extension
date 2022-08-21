import React, { Dispatch, useEffect } from 'react'
import styled from '@emotion/styled'

import Typography from '../../../_general/components/Typography'
import PasswordTextField from '../../../_general/components/TextField/PasswordTextField'
import TextField from '../../../_general/components/TextField'
import { useTranslation } from 'react-i18next'
import {
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
} from '@mui/material'
import { Account, NetworkType } from 'symbol-sdk'

const networks = [
  {
    name: 'TEST NET',
    value: 152,
  },
  {
    name: 'MAIN NET',
    value: 104,
  },
]

export type Props = {
  setName: Dispatch<string>
  setPassword: Dispatch<string>
  setNet: Dispatch<NetworkType>
  setAddress: Dispatch<string>
  setPrikey: Dispatch<string>
  net: NetworkType
  address: string
}

const Component: React.FC<Props> = ({
  setName,
  setPassword,
  setNet,
  setAddress,
  setPrikey,
  net,
  address,
}) => {
  const [t] = useTranslation()

  useEffect(() => {
    const acc = Account.generateNewAccount(net)
    setAddress(acc.address.plain())
    setPrikey(acc.privateKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [net])

  return (
    <Root>
      <Center>
        <Typography fontSize={24} text={t('accmodal_create_generated_addr')} />
        <Typography fontSize={20} text={address} />
      </Center>
      <FormControl sx={{ width: '100%' }}>
        <InputLabel id="demo-multiple-name-label">Network</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={net}
          onChange={(e) => setNet(e.target.value as unknown as NetworkType)}
          input={<OutlinedInput label="Name" />}>
          {networks.map((n) => (
            <MenuItem key={n.name} value={n.value}>
              {n.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField label="Name" setText={setName} variant="text" />
      <PasswordTextField label="Password" setPass={setPassword} />
    </Root>
  )
}

export default Component

const Root = styled('div')({
  width: 'calc(100% - 64px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
})

const Center = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '32px',
  '> *': {
    margin: '4px',
  },
})
