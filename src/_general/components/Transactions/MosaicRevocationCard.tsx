import React from 'react'

import styled from '@emotion/styled'
import { MosaicSupplyRevocationTransaction } from 'symbol-sdk'
import Typography from '../Typography'
import TxMosaic from '../TransactionInfo/Mosaic'
import TxAddress from '../TransactionInfo/Address'
type Props = {
  transaction: MosaicSupplyRevocationTransaction
}
const MosaicRevocationCard: React.VFC<Props> = ({ transaction }) => {
  return (
    <Wrapper>
      <TxAddress address={transaction.sourceAddress} />
      <TxMosaic mosaic={transaction.mosaic} />
    </Wrapper>
  )
}

export default MosaicRevocationCard

const Wrapper = styled('div')({
  margin: '8px',
  padding: '8px',
})
