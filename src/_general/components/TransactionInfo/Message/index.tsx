import React from 'react'

import styled from '@emotion/styled'
import Typography from '../../Typography'
import { Message } from 'symbol-sdk'

export type Props = {
  message: Message
}

const TxMessage: React.VFC<Props> = ({ message }) => {
  return (
    <Wrapper>
      <Typography text="Message" variant="h5" />
      <Wrapper>
        <Typography text={message.payload.toString()} variant="subtitle1" />
      </Wrapper>
    </Wrapper>
  )
}

export default TxMessage

const Wrapper = styled('div')({
  margin: '8px',
})
