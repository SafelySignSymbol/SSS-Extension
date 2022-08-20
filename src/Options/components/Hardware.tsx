import React, { Dispatch, useEffect, useState } from 'react'
import styled from '@emotion/styled'

import Typography from '../../_general/components/Typography'
import { useTranslation } from 'react-i18next'
import TransportWebHID from '@ledgerhq/hw-transport-webhid'
import {
  LedgerDerivationPath,
  LedgerNetworkType,
  SymbolLedger,
} from 'symbol-ledger-typescript'
import { Address, NetworkType } from 'symbol-sdk'
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material'
import { IconContext } from 'react-icons'
import { MdArrowLeft, MdArrowRight } from 'react-icons/md'
import TextField from '../../_general/components/TextField'

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
  setNet: Dispatch<NetworkType>
  setAddress: Dispatch<string>
  setPublicKey: Dispatch<string>
  setPrivateKey: Dispatch<string>
  network: NetworkType
  address: string
}

const ERR = 'ハードウェアウォアレットの接続を確認してください'

const Component: React.FC<Props> = ({
  setName,
  setNet,
  setAddress,
  setPublicKey,
  setPrivateKey,
  network,
  address,
}) => {
  const [t] = useTranslation()
  const [num, setNum] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      getAccount(num)
    }, 1000)

    return () => {
      clearInterval(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [network])
  const next = () => {
    getAccount(num + 1)
    setNum((prev) => prev + 1)
  }
  const back = () => {
    getAccount(num - 1)
    setNum((prev) => prev - 1)
  }

  const getAccount = (index: number) => {
    TransportWebHID.create(100, 100).then(async (transport) => {
      const ledger = new SymbolLedger(transport, 'XYM')
      try {
        const ledgerNetworkType = network as number as LedgerNetworkType
        const path = LedgerDerivationPath.getPath(ledgerNetworkType, index)
        const publicKey = await ledger.getAccount(
          path,
          ledgerNetworkType,
          false,
          false,
          false
        )
        setAddress(Address.createFromPublicKey(publicKey, network).plain())
        setPublicKey(publicKey)
        setPrivateKey(path)
      } catch {
        setAddress(ERR)
      } finally {
        await ledger.close()
      }
    })
  }
  return (
    <Root>
      <Center>
        <Typography fontSize={20} text={t('accmodal_hardware')} />
        <FormControl sx={{ width: '100%' }}>
          <InputLabel id="demo-multiple-name-label">Network</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            value={network}
            onChange={(e) => setNet(e.target.value as unknown as NetworkType)}
            input={<OutlinedInput label="Name" />}>
            {networks.map((n) => (
              <MenuItem key={n.name} value={n.value}>
                {n.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Wrapper>
          <IconButton onClick={back} disabled={num === 0 || address === ERR}>
            <IconContext.Provider value={{ size: '24px' }}>
              <MdArrowLeft style={{ margin: '6px' }} />
            </IconContext.Provider>
          </IconButton>
          <Typography text={address} fontSize={20} />
          <IconButton onClick={next} disabled={address === ERR}>
            <IconContext.Provider value={{ size: '24px' }}>
              <MdArrowRight style={{ margin: '6px' }} />
            </IconContext.Provider>
          </IconButton>
        </Wrapper>
      </Center>
      <TextField label="Name" setText={setName} variant="text" />
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

const Wrapper = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const TFWrapper = styled('div')({
  width: '100%',
  '& > div': {
    width: '100%',
  },
})
