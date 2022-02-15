import React from 'react'

import styled from '@emotion/styled'
import { AccountMetadataTransaction } from 'symbol-sdk'
import TxAddress from '../TransactionInfo/Address'
import Metadata from '../TransactionInfo/Metadata'

type Props = {
  transaction: AccountMetadataTransaction
}
const AccountMetadataCard: React.VFC<Props> = ({ transaction }) => {
  return (
    <Wrapper>
      <TxAddress address={transaction.targetAddress} />
      <Metadata
        metadataKey={transaction.scopedMetadataKey.toHex()}
        value={transaction.value}
      />
    </Wrapper>
  )
}

export default AccountMetadataCard

const Wrapper = styled('div')({
  margin: '8px',
  padding: '8px',
})
