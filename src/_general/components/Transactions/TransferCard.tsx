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
      <Typography text="Message" fontSize={20} />
      <Spacer MLeft="16px">
        <Typography text={transaction.message.payload} fontSize={16} />
      </Spacer>
      <Typography text="Mosaics" fontSize={20} />
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
