import React from 'react'

import styled from '@emotion/styled'
import { TransferTransaction } from 'symbol-sdk'
import Typography from '../Typography'
import Spacer from '../Spacer'
import TxAddress from '../TransactionInfo/Address'
import TxMosaic from '../TransactionInfo/Mosaic'

type Props = {
  transaction: TransferTransaction
}
const TransferCard: React.VFC<Props> = ({ transaction }) => {
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

export default TransferCard

const Wrapper = styled('div')({
  margin: '8px',
  padding: '8px',
})
