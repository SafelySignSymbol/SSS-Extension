import React from 'react'

import styled from '@emotion/styled'

import { Box } from '@mui/system'
import TransactionCard from './TransactionCard'
import { TransactionMapping } from 'symbol-sdk'
import { TransactionURI } from 'symbol-uri-scheme'
import Typography from '../../../_general/components/Typography'
import { getTransactionType } from '../../../_general/lib/TransactionType'
import { Chip, Tooltip } from '@mui/material'

export type Props = {
  transaction: string
}

const Component: React.VFC<Props> = ({ transaction }) => {
  const tx = TransactionURI.fromURI(
    transaction,
    TransactionMapping.createFromPayload
  ).toTransaction()

  return (
    <Wrapper>
      <Header>
        <TxType>
          <Typography text={getTransactionType(tx.type)} fontSize={28} />
          <Tooltip title="MAX FEE">
            <Chip label={`${Number(tx.maxFee.toString()) / 1000000} XYM`} />
          </Tooltip>
        </TxType>
        <Box sx={{ flexGrow: 1 }} />
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
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
})
