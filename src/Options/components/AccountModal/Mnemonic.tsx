import React, { Dispatch, useEffect, useState } from 'react'
import styled from '@emotion/styled'

import TextField from '../../../_general/components/TextField'
import PasswordTextField from '../../../_general/components/TextField/PasswordTextField'
import Typography from '../../../_general/components/Typography'
import { useTranslation } from 'react-i18next'
import {
  ExtendedKey,
  MnemonicPassPhrase,
  Network,
  Wallet,
} from 'symbol-hd-wallets'
import { Account, Convert, NetworkType } from 'symbol-sdk'

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

  const [mnemonic, setMuemonic] = useState('')

  useEffect(() => {
    console.log('change', mnemonic.split(' ').length)

    if (mnemonic.split(' ').length === 24) {
      const seed = new MnemonicPassPhrase(mnemonic).toSeed().toString('hex')
      const xkey = ExtendedKey.createFromSeed(seed, Network.SYMBOL)
      const wallet = new Wallet(xkey.derivePath("m/44'/4343'/0'/0'/0'"))

      const pri = wallet.getAccountPrivateKey()

      const acc = Account.createFromPrivateKey(pri, NetworkType.MAIN_NET)
      setPrivateKey(pri)
      setAddress(acc.address.plain())
    }
  }, [mnemonic])

  return (
    <Root>
      <Center>
        <Typography fontSize={24} text="Import Mnemonic β" />
      </Center>
      <TextField label="Name" setText={setName} variant="text" />
      <TextField label="Mnimonic" setText={setMuemonic} variant="text" />
      <PasswordTextField label="Password" setPass={setPassword} />
    </Root>
  )
}

export default Component

const Root = styled('div')({
  width: 'calc(100% - 64px)',
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
