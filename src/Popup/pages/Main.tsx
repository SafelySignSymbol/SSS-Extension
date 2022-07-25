import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'

import { ExtensionAccount } from '../../_general/model/ExtensionAccount'
import { SquareLogo } from '../../_general/components/Logo/'
import { IconButton } from '@mui/material'
import { IconContext } from 'react-icons'
import { RiSettings2Fill } from 'react-icons/ri'
import Typography from '../../_general/components/Typography'
import Button from '../../_general/components/Button'
import Color, { addAlpha } from '../../_general/utils/Color'
import Spacer from '../../_general/components/Spacer'
import TransactionInfo from './components/TransactionInfo'
import { getData } from '../../_general/lib/Storage'
import { TransactionURI } from 'symbol-uri-scheme'
import { Transaction, TransactionMapping } from 'symbol-sdk'
import NotFoundTx from './components/NotFoundTx'
import { EncriptionMessage } from '../../_general/model/EncriptionMessage'
import { MESSAGE, TRANSACTION } from '../../_general/model/Data'
import {
  REQUEST_ACTIVE_ACCOUNT_TOKEN,
  REQUEST_MESSAGE_ENCODE,
} from '../../_general/model/MessageType'
import MessageEncription from './components/MessageEncription'

export interface Props {
  extensionAccount: ExtensionAccount
  type: string
  signTx: (tx: Transaction | null) => void
  encriptMessage: (message: string, pubkey: string) => void
}

const Main: React.VFC<Props> = ({
  extensionAccount,
  type,
  signTx,
  encriptMessage,
}) => {
  const [transaction, setTransaction] = useState<string>('')
  const [enMsg, setEnMsg] = useState<EncriptionMessage | null>(null)

  useEffect(() => {
    getData().then((data) => {
      if (data.dataType === TRANSACTION && !!data.transaction) {
        setTransaction(data.transaction)
      }
      if (data.dataType === MESSAGE && !!data.message) {
        setEnMsg(
          new EncriptionMessage(data.message.msg, data.message.publicKey)
        )
      }
    })
  }, [])

  const hundleClick = () => {
    if (
      (type === REQUEST_MESSAGE_ENCODE ||
        type === REQUEST_ACTIVE_ACCOUNT_TOKEN) &&
      enMsg !== null
    ) {
      encriptMessage(enMsg.message, enMsg.pubkey)
    } else {
      const tx = TransactionURI.fromURI(
        transaction,
        TransactionMapping.createFromPayload
      ).toTransaction()
      signTx(tx)
    }
    setTimeout(() => {
      window.close()
    }, 1000)
  }

  const contents = () => {
    if (type === REQUEST_MESSAGE_ENCODE && enMsg !== null) {
      return (
        <Contents>
          <MessageEncription message={enMsg.message} />
        </Contents>
      )
    }
    if (type === REQUEST_ACTIVE_ACCOUNT_TOKEN && enMsg !== null) {
      return (
        <Contents>
          <Center>
            <M>
              <Typography text="Authentication To" variant="h3" />
            </M>
            <Typography text={enMsg.pubkey.substring(0, 32)} variant="h4" />
            <Typography text={enMsg.pubkey.substring(32)} variant="h4" />
          </Center>
        </Contents>
      )
    }
    return (
      <Contents>
        {transaction !== '' ? (
          <TransactionInfo transaction={transaction} />
        ) : (
          <NotFoundTx />
        )}
      </Contents>
    )
  }

  return (
    <Container>
      <Header>
        <SquareLogo onClick={() => console.log('')} />
        <Grid>
          <Typography text={extensionAccount.address} variant="h6" />
        </Grid>
        <IconButton onClick={() => chrome.runtime.openOptionsPage()}>
          <IconContext.Provider value={{ size: '32px' }}>
            <RiSettings2Fill style={{ margin: '6px' }} />
          </IconContext.Provider>
        </IconButton>
      </Header>
      {contents()}
      <Footer>
        <Spacer margin="8px">
          <Button text="SIGN" onClick={hundleClick} />
        </Spacer>
      </Footer>
    </Container>
  )
}

export default Main

const Center = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
})

const M = styled('div')({
  marginBottom: '32px',
})

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
  width: 'calc(100vw - 64px)',
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
