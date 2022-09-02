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
        fontSize={20}
      />
      <Typography
        text={`Divisibillity: ${transaction.divisibility}`}
        fontSize={20}
      />
      <Typography
        text={`Restrictable: ${transaction.flags.restrictable}`}
        fontSize={20}
      />
      <Typography
        text={`SupplyMutable: ${transaction.flags.supplyMutable}`}
        fontSize={20}
      />
      <Typography
        text={`Transferable: ${transaction.flags.transferable}`}
        fontSize={20}
      />
      <Typography
        text={`Revokable: ${transaction.flags.revokable}`}
        fontSize={20}
      />
    </Wrapper>
  )
}

export default MosaicDefinitionCard

const Wrapper = styled('div')({
  margin: '8px',
  padding: '8px',
})
