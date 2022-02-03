import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'

import { ExtensionAccount } from '../../_general/model/ExtensionAccount'
import Logo from '../../_general/components/Logo'
import { IconButton } from '@mui/material'
import { IconContext } from 'react-icons'
import { RiSettings2Fill } from 'react-icons/ri'
import Typography from '../../_general/components/Typography'
import Button from '../../_general/components/Button'
import Color, { addAlpha } from '../../_general/utils/Color'
import Spacer from '../../_general/components/Spacer'
import TransactionInfo from './components/TransactionInfo'
import { getTransaction } from '../../_general/lib/Storage'
import { TransactionURI } from 'symbol-uri-scheme'
import { Transaction, TransactionMapping } from 'symbol-sdk'

export interface Props {
  extensionAccount: ExtensionAccount
  sign: (tx: Transaction | null) => void
}

const Main: React.VFC<Props> = ({ extensionAccount, sign }) => {
  const [transaction, setTransaction] = useState<Transaction | null>(null)

  useEffect(() => {
    getTransaction().then((tx) => {
      const transaction = TransactionURI.fromURI(
        tx,
        TransactionMapping.createFromPayload
      ).toTransaction()
      setTransaction(transaction)
    })
  }, [])


  return (
    <Container>
      <Header>
        <Logo onClick={() => console.log('')} />
        <Grid>
          <Typography text={extensionAccount.address} variant="h6" />
        </Grid>
        <IconButton onClick={() => chrome.runtime.openOptionsPage()}>
          <IconContext.Provider value={{ size: '32px' }}>
            <RiSettings2Fill style={{ margin: '6px' }} />
          </IconContext.Provider>
        </IconButton>
      </Header>
      <Contents>
        {transaction !== null && (
          <TransactionInfo
            transaction={new TransactionURI(
              transaction.serialize(),
              TransactionMapping.createFromPayload
            ).build()}
          />
        )}
      </Contents>
      <Footer>
        <Spacer margin="8px">
          <Button text="SIGN" onClick={() => sign(transaction)} />
        </Spacer>
      </Footer>
    </Container>
  )
}

export default Main

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
})

const Header = styled('div')({
  display: 'flex',
  height: '64px',
  margin: '8px',
  justifyContent: 'space-between',
})

const Contents = styled('div')({
  margin: '16px 32px',
  height: 'calc(100vh - 32px - 80px - 80px)',
  border: 'solid ' + addAlpha(Color.sky, 0.4),
  borderWidth: '4px 0px 4px 4px',
  boxSizing: 'border-box',
  overflowY: 'scroll',
  '::-webkit-scrollbar-track': {
    background: addAlpha(Color.sky, 0.4),
  },
  '::-webkit-scrollbar-thumb': {
    borderRadius: '4px',
    background: addAlpha(Color.sky, 0.9),
  },
  '::-webkit-scrollbar': {
    width: '4px',
    borderRadius: '4px',
  },
})

const Grid = styled('div')({
  display: 'grid',
  alignItems: 'center',
})

const Footer = styled('div')({
  display: 'flex',
  height: '64px',
  margin: '8px',
  justifyContent: 'center',
})
