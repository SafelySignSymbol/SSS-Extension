import React from 'react'

import styled from '@emotion/styled'
import {
  Mosaic,
  MosaicId,
  Transaction,
  TransactionType,
  TransferTransaction,
} from 'symbol-sdk'
import Typography from '../../../_general/components/Typography'
import Spacer from '../../../_general/components/Spacer'
import { useEffect } from '@storybook/addons'

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
  return <>404</>
}

export default TransactionCard

type TransferProps = {
  transaction: TransferTransaction
}

const TransferTransactionCard: React.VFC<TransferProps> = ({ transaction }) => {
  return (
    <Wrapper>
      <Center>
        <Spacer margin="16px 0px">
          <Typography
            text={transaction.recipientAddress.plain()}
            variant="h5"
          />
        </Spacer>
      </Center>
      <Typography text="Message" variant="h4" />
      <Spacer MLeft="16px">
        <Typography text={transaction.message.payload} variant="h5" />
      </Spacer>
      <Typography text="Mosaics" variant="h4" />
      <Spacer MLeft="16px">
        {transaction.mosaics.map((mosaic) => {
          console.log('amount', mosaic.amount.toString())
          console.log('amount')

          return <MosaicData mosaic={mosaic} />
        })}
      </Spacer>
    </Wrapper>
  )
}

const MosaicData: React.VFC<{ mosaic: Mosaic }> = ({ mosaic }) => {
  return (
    <Side>
      <Typography text={mosaic.id.toHex()} variant="h5" />
      <Typography text={mosaic.amount.toString()} variant="subtitle1" />
    </Side>
  )
}

const Wrapper = styled('div')({
  margin: '8px',
  padding: '8px',
})

const Center = styled('div')({
  display: 'flex',
  justifyContent: 'center',
})

const Side = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
})
