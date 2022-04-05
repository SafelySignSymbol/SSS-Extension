import React from 'react'

import styled from '@emotion/styled'
import {
  AccountMetadataTransaction,
  AggregateTransaction,
  MosaicMetadataTransaction,
  NamespaceMetadataTransaction,
  Transaction,
  TransactionType,
  TransferTransaction,
} from 'symbol-sdk'
import Typography from '../../../_general/components/Typography'

import TransferCard from '../../../_general/components/Transactions/TransferCard'
import AggregateComplateTransactionCard from '../../../_general/components/Transactions/AggregatTransactionCard'
import AccountMetadataCard from '../../../_general/components/Transactions/AccountMetadataCard'
import MosaicMetadataCard from '../../../_general/components/Transactions/MosaicMetadataCard'
import NamespaceMetadataCard from '../../../_general/components/Transactions/NamespaceMetadataCard'

export type Props = {
  transaction: Transaction
}

const TransactionCard: React.VFC<Props> = ({ transaction }) => {
  if (transaction.type === TransactionType.TRANSFER) {
    return <TransferCard transaction={transaction as TransferTransaction} />
  }

  if (transaction.type === TransactionType.AGGREGATE_COMPLETE) {
    return (
      <AggregateComplateTransactionCard
        transaction={transaction as AggregateTransaction}
      />
    )
  }
  if (transaction.type === TransactionType.AGGREGATE_BONDED) {
    return (
      <AggregateComplateTransactionCard
        transaction={transaction as AggregateTransaction}
      />
    )
  }

  if (transaction.type === TransactionType.ACCOUNT_METADATA) {
    return (
      <AccountMetadataCard
        transaction={transaction as AccountMetadataTransaction}
      />
    )
  }

  if (transaction.type === TransactionType.MOSAIC_METADATA) {
    return (
      <MosaicMetadataCard
        transaction={transaction as MosaicMetadataTransaction}
      />
    )
  }

  if (transaction.type === TransactionType.NAMESPACE_METADATA) {
    return (
      <NamespaceMetadataCard
        transaction={transaction as NamespaceMetadataTransaction}
      />
    )
  }

  return (
    <Center>
      <Typography text="Can not preview this Transaction." variant="h4" />
    </Center>
  )
}

export default TransactionCard

const Center = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
})
