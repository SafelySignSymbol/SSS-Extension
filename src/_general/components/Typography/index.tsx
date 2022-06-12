import React from 'react'

import styled from '@emotion/styled'
import Color from '../../utils/Color'
import { Typography } from '@mui/material'

export interface Props {
  color?: string
  text: string
  variant: TypographyVariant
}
const Component: React.FC<Props> = ({
  color = Color.default,
  text,
  variant,
  ...rest
}) => {
  return (
    <STypography {...rest} color={color} variant={variant}>
      {text}
    </STypography>
  )
}

const STypography = styled(Typography)<{
  color: string
}>`
  color: ${(props) => props.color};
  word-break: break-all;
  font-family: Roboto, Noto Sans JP, Times New Roman;
`

export default Component

type TypographyVariant =
  | 'body1'
  | 'body2'
  | 'button'
  | 'caption'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'inherit'
  | 'overline'
  | 'subtitle1'
  | 'subtitle2'
