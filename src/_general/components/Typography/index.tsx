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
  variant: string
}>`
  color: ${(props) => props.color};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: Times New Roman, Noto Sans JP;
  ${(props) => props.variant === 'h4' && 'font-size: 1.75rem;'}
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
