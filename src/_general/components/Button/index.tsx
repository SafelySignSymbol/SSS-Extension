import React from 'react'
import styled from '@emotion/styled'

import { Button } from '@mui/material'

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
  background: sky !important;
  border-color: sky !important;
  font-weight: 700;
`
const SButton = styled(Button)`
  color: sky !important;
  border-color: sky !important;

  :hover {
    border-color: sky !important;
    background-color: sky !important;
  }
`
