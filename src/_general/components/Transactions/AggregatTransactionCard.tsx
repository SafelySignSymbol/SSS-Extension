import React from 'react'

import styled from '@emotion/styled'
import { AggregateTransaction } from 'symbol-sdk'
import Typography from '../Typography'
import { Divider } from '@mui/material'
import TransactionCard from '../../../Popup/pages/components/TransactionCard'
import { getTransactionType } from '../../lib/TransactionType'

type AggregateComplateProps = {
  transaction: AggregateTransaction
}

const AggregateComplateTransactionCard: React.VFC<AggregateComplateProps> = ({
  transaction,
}) => {
  return (
    <Wrapper>
      <Typography text="Inner Transactions" variant="h5" />
      {transaction.innerTransactions.map((tx, i) => {
        return (
          <Wrapper>
            <Typography
              text={`Tx ${i + 1} ${getTransactionType(tx.type)}`}
              variant="h5"
            />
            <TransactionCard transaction={tx} />
            {i !== transaction.innerTransactions.length - 1 && <Divider />}
          </Wrapper>
        )
      })}
    </Wrapper>
  )
}

export default AggregateComplateTransactionCard

const Wrapper = styled('div')({
  margin: '8px',
  padding: '8px',
})
