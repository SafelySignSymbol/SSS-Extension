import React, { Dispatch } from 'react'

import styled from '@emotion/styled'

import { Box } from '@mui/system'
import { IconButton } from '@mui/material'
import { IconContext } from 'react-icons'
import { MdRemove } from 'react-icons/md'
import TransactionCard from './TransactionCard'
import { TransactionMapping } from 'symbol-sdk'
import { TransactionURI } from 'symbol-uri-scheme'
import Typography from '../../../_general/components/Typography'
import { getTransactionType } from '../../../_general/lib/TransactionType'
import { REMOVE_DATA } from '../../../_general/model/MessageType'

export type Props = {
  transaction: string
  setUpdate: Dispatch<number>
}

const Component: React.VFC<Props> = ({ transaction, setUpdate }) => {
  const tx = TransactionURI.fromURI(
    transaction,
    TransactionMapping.createFromPayload
  ).toTransaction()

  const remove = () => {
    setUpdate(new Date().getTime())
    chrome.runtime.sendMessage({
      type: REMOVE_DATA,
    })
  }
  console.log({ tx })

  return (
    <Wrapper>
      <Header>
        <TxType>
          <Typography text={getTransactionType(tx.type)} variant="h5" />
        </TxType>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton onClick={remove}>
          <IconContext.Provider value={{ size: '24px' }}>
            <MdRemove />
          </IconContext.Provider>
        </IconButton>
      </Header>
      <Content>
        <TransactionCard transaction={tx} />
      </Content>
    </Wrapper>
  )
}

export default Component

const Wrapper = styled('div')({
  margin: '8px',
  height: 'calc(100% - 16px)',
})

const Header = styled('div')({
  display: 'flex',
})
const Content = styled('div')({
  height: 'calc(100% - 48px)',
})

const TxType = styled('div')({
  display: 'grid',
  alignItems: 'center',
})
