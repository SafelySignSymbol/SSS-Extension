import React from 'react'

import styled from '@emotion/styled'
import Color from '../../utils/Color'

export interface Props {
  color?: string
  fontSize?: number
  text: string
}
const Component: React.FC<Props> = ({
  color = Color.default,
  fontSize = 16,
  text,
  ...rest
}) => {
  return (
    <STypography {...rest} color={color} fontSize={fontSize}>
      {text}
    </STypography>
  )
}

const STypography = styled('div')((p: { color: string; fontSize: number }) => ({
  color: `${p.color}`,
  fontSize: `${p.fontSize}px`,
  wordBreak: 'break-all',
  fontFamily: 'Roboto, Noto Sans JP, Times New Roman',
}))

export default Component
