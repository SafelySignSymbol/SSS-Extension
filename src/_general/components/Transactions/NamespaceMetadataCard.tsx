import React from 'react'

import styled from '@emotion/styled'
import { NamespaceMetadataTransaction } from 'symbol-sdk'
import Metadata from '../TransactionInfo/Metadata'
import Typography from '../Typography'

type Props = {
  transaction: NamespaceMetadataTransaction
}
const AccountMetadataCard: React.VFC<Props> = ({ transaction }) => {
  console.log('id', transaction.targetNamespaceId)
  return (
    <Wrapper>
      <Typography text={transaction.targetNamespaceId.toHex()} variant="h5" />
      <Wrapper>
        <Metadata
          metadataKey={transaction.scopedMetadataKey.toHex()}
          value={transaction.value}
        />
      </Wrapper>
    </Wrapper>
  )
}

export default AccountMetadataCard

const Wrapper = styled('div')({
  margin: '8px',
  padding: '8px',
})
