import React from 'react'

import styled from '@emotion/styled'
import Typography from '../../../_general/components/Typography'
import { Divider } from '@mui/material'
import Color from '../../../_general/utils/Color'

export type Props = {
  message: string
}

const Component: React.VFC<Props> = ({ message }) => {
  return (
    <Wrapper>
      <Header>
        <Typography text="MessageEncription" variant="h4" />
        <SDivider />
      </Header>
      <Content>
        <Message text={message} variant="h5" />
      </Content>
    </Wrapper>
  )
}

export default Component

const Wrapper = styled('div')({
  margin: '8px',
  height: 'calc(100% - 16px)',
})
const Message = styled(Typography)({
  fontFamily: 'Roboto',
})

const Header = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  '> *': {
    margin: '16px',
  },
})

const SDivider = styled(Divider)({
  width: 'calc(100% - 64px)',
  background: Color.sky,
  color: Color.sky,
})

const Content = styled('div')({
  margin: '16px 32px',
})
