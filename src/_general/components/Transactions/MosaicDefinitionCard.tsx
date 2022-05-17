import React from 'react'

import styled from '@emotion/styled'
import { MosaicDefinitionTransaction } from 'symbol-sdk'
import Typography from '../Typography'

type Props = {
  transaction: MosaicDefinitionTransaction
}
const MosaicDefinitionCard: React.VFC<Props> = ({ transaction }) => {
  return (
    <Wrapper>
      <Typography
        text={`MosaicID: ${transaction.mosaicId.toHex()}`}
        variant="h5"
      />
      <Typography
        text={`Divisibillity: ${transaction.divisibility}`}
        variant="h5"
      />
      <Typography
        text={`Restrictable: ${transaction.flags.restrictable}`}
        variant="h5"
      />
      <Typography
        text={`SupplyMutable: ${transaction.flags.supplyMutable}`}
        variant="h5"
      />
      <Typography
        text={`Transferable: ${transaction.flags.transferable}`}
        variant="h5"
      />
      <Typography
        text={`Revokable: ${transaction.flags.revokable}`}
        variant="h5"
      />
    </Wrapper>
  )
}

export default MosaicDefinitionCard

const Wrapper = styled('div')({
  margin: '8px',
  padding: '8px',
})
