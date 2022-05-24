import React from 'react'
import styled from '@emotion/styled'

import { Button } from '@mui/material'
import { addAlpha } from '../../utils/Color'

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
  color: black !important;
  border-color: black !important;
  font-family: Times New Roman, Noto Sans JP;

  :hover {
    border-color: black !important;
    background-color: ${addAlpha('rgb(0, 0, 0)', 0.6)} !important;
    color: white !important;
  }
`
// const SButton = styled(Button)`
//   color: ${Color.pink} !important;
//   border-color: ${Color.pink} !important;

//   :hover {
//     border-color: ${Color.pink} !important;
//     background-color: ${addAlpha(Color.pink, 0.6)} !important;
//     color: white !important;
//   }
// `
