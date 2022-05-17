import React from 'react'

import styled from '@emotion/styled'
import { MosaicSupplyChangeTransaction } from 'symbol-sdk'
import Typography from '../Typography'

type Props = {
  transaction: MosaicSupplyChangeTransaction
}
const MosaicSupplyChangeCard: React.VFC<Props> = ({ transaction }) => {
  return (
    <Wrapper>
      <Typography
        text={`MosaicID: ${transaction.mosaicId.toHex()}`}
        variant="h5"
      />
      <Typography
        text={`Supply: ${transaction.delta.compact()}`}
        variant="h5"
      />
    </Wrapper>
  )
}

export default MosaicSupplyChangeCard

const Wrapper = styled('div')({
  margin: '8px',
  padding: '8px',
})
