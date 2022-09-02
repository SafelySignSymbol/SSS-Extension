import React from 'react'

import styled from '@emotion/styled'
import Typography from '../../Typography'

export type Props = {
  metadataKey: string
  value: string
}

const TxMessage: React.VFC<Props> = ({ metadataKey, value }) => {
  return (
    <Wrapper>
      <Typography text="Metadata" fontSize={24} />
      <Center>
        <Typography text={metadataKey} fontSize={20} />
        <Typography text={value} fontSize={18} />
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
