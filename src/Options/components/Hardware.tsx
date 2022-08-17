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
import { IconButton } from '@mui/material'
import { IconContext } from 'react-icons'
import { MdArrowLeft, MdArrowRight } from 'react-icons/md'
import TextField from '../../_general/components/TextField'

export type Props = {
  setName: Dispatch<string>
  setAddress: Dispatch<string>
  setPublicKey: Dispatch<string>
  setPrivateKey: Dispatch<string>
  network: NetworkType
  address: string
}

const ERR = 'ハードウェアウォアレットの接続を確認してください'

const Component: React.FC<Props> = ({
  setName,
  setAddress,
  setPublicKey,
  setPrivateKey,
  network,
  address,
}) => {
  const [t] = useTranslation()
  const [num, setNum] = useState(0)

  useEffect(() => {
    getAccount(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const next = () => {
    getAccount(num + 1)
    setNum((prev) => prev + 1)
  }
  const back = () => {
    getAccount(num - 1)
    setNum((prev) => prev - 1)
  }

  const getAccount = (index: number) => {
    TransportWebHID.create(5000, 5000).then(async (transport) => {
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
        <Typography variant="h5" text={t('accmodal_hardware')} />
        <Wrapper>
          <IconButton onClick={back} disabled={num === 0 || address === ERR}>
            <IconContext.Provider value={{ size: '24px' }}>
              <MdArrowLeft style={{ margin: '6px' }} />
            </IconContext.Provider>
          </IconButton>
          <Typography text={address} variant="subtitle1" />
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
