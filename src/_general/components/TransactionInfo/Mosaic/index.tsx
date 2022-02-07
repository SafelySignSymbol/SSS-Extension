import React from 'react'

import styled from '@emotion/styled'
import Typography from '../../Typography'
import { Mosaic } from 'symbol-sdk'

export type Props = {
  mosaic: Mosaic
}

const TxMosaic: React.VFC<Props> = ({ mosaic }) => {
  return (
    <Wrapper>
      <Center>
        <Typography text={mosaic.id.toHex()} variant="h5" />
        <Typography text={mosaic.amount.toString()} variant="subtitle1" />
      </Center>
    </Wrapper>
  )
}

export default TxMosaic

const Wrapper = styled('div')({
  margin: '8px',
})

const Center = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
})
