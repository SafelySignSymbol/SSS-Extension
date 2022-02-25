import React from 'react'

import styled from '@emotion/styled'
import Typography from '../../Typography'

export type Props = {
  metadataKey: string
  value: string
}

const TxMessage: React.VFC<Props> = ({ metadataKey, value }) => {
  console.log('key', metadataKey)
  console.log('value', value)
  return (
    <Wrapper>
      <Typography text="Metadata" variant="h5" />
      <Center>
        <Typography text={metadataKey} variant="h6" />
        <Typography text={value} variant="subtitle1" />
      </Center>
    </Wrapper>
  )
}

export default TxMessage

const Wrapper = styled('div')({
  margin: '8px',
})

const Center = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
})
