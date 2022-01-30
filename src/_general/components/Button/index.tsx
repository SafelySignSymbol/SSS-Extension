import React from 'react'
import styled from '@emotion/styled'

import { Button } from '@mui/material'
import Color, { addAlpha } from '../../utils/Color'

export interface Props {
  text: string
  onClick: () => void
  fill?: boolean
}

const Component: React.VFC<Props> = ({ text, onClick, fill = false }) => {
  if (fill) {
    return (
      <FButton variant="outlined" onClick={onClick}>
        {text}
      </FButton>
    )
  }

  return (
    <SButton variant="outlined" onClick={onClick}>
      {text}
    </SButton>
  )
}

export default Component

const FButton = styled(Button)`
  color: white !important;
  background: ${Color.pink} !important;
  border-color: ${Color.pink} !important;
  font-weight: 700;
`
const SButton = styled(Button)`
  color: ${Color.pink} !important;
  border-color: ${Color.pink} !important;

  :hover {
    border-color: ${Color.pink} !important;
    background-color: ${addAlpha(Color.pink, 0.6)} !important;
    color: white !important;
  }
`
