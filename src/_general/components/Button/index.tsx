import React from 'react'
import styled from '@emotion/styled'

import { Button } from '@mui/material'
import Color from '../../utils/Color'

export interface Props {
  text: string
  onClick: () => void
}

const Component: React.VFC<Props> = ({ text, onClick }) => {
  return (
    <SButton variant="outlined" onClick={onClick}>
      {text}
    </SButton>
  )
}

export default Component

const SButton = styled(Button)({
  color: Color.blue,
  ':hover': {
    background: Color.blue,
    color: Color.base_white,
  },
})
