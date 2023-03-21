import React from 'react'

import styled from '@emotion/styled'
import Typography from '../../../_general/components/Typography'
import { Divider } from '@mui/material'
import Color from '../../../_general/utils/Color'

const Component: React.VFC = () => {
  return (
    <Content>
      <Typography text="MessageDecryption" fontSize={32} />
    </Content>
  )
}

export default Component

const Content = styled('div')({
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})
