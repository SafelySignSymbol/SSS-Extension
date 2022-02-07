import React from 'react'

import styled from '@emotion/styled'
import { Transaction, TransactionType, TransferTransaction } from 'symbol-sdk'
import Typography from '../../../_general/components/Typography'
import Spacer from '../../../_general/components/Spacer'
import TxAddress from '../../../_general/components/TransactionInfo/Address'
import TxMosaic from '../../../_general/components/TransactionInfo/Mosaic'

export type Props = {
  transaction: Transaction
}

const TransactionCard: React.VFC<Props> = ({ transaction }) => {
  if (transaction.type === TransactionType.TRANSFER) {
    return (
      <TransferTransactionCard
        transaction={transaction as TransferTransaction}
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

type TransferProps = {
  transaction: TransferTransaction
}

const TransferTransactionCard: React.VFC<TransferProps> = ({ transaction }) => {
  return (
    <Wrapper>
      <TxAddress address={transaction.recipientAddress} />
      <Typography text="Message" variant="h5" />
      <Spacer MLeft="16px">
        <Typography text={transaction.message.payload} variant="h5" />
      </Spacer>
      <Typography text="Mosaics" variant="h5" />
      {transaction.mosaics.map((mosaic) => {
        return <TxMosaic mosaic={mosaic} key={mosaic.id.toHex()} />
      })}
    </Wrapper>
  )
}

const Wrapper = styled('div')({
  margin: '8px',
  padding: '8px',
})

const Center = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
})
