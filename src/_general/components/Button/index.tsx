import React from 'react'
import styled from '@emotion/styled'

import { Button } from '@mui/material'
import Color, { addAlpha } from '../../utils/Color'

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

const SButton = styled(Button)`
  color: ${Color.pink} !important;
  border-color: ${Color.pink} !important;

  :hover {
    border-color: ${Color.pink} !important;
    background-color: ${addAlpha(Color.pink, 0.6)} !important;
    color: white !important;
  }
`
