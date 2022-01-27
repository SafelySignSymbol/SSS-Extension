import * as React from 'react'
import styled from '@emotion/styled'

export interface SpaceProps {
  margin?: string | null
  padding?: string | null
  MTop?: string
  MRight?: string
  MLeft?: string
  MBottom?: string
  PTop?: string
  PRight?: string
  PLeft?: string
  PBottom?: string
}

const Spacer: React.FC<SpaceProps> = ({
  margin = null,
  padding = null,
  MTop = '0',
  MRight = '0',
  MBottom = '0',
  MLeft = '0',
  PTop = '0',
  PRight = '0',
  PBottom = '0',
  PLeft = '0',
  children,
}) => {
  if (margin === null) margin = `${MTop} ${MRight} ${MBottom} ${MLeft}`
  if (padding === null) padding = `${PTop} ${PRight} ${PBottom} ${PLeft}`

  return (
    <Style margin={margin} padding={padding}>
      {children}
    </Style>
  )
}

export default Spacer

const Style = styled('div')<{
  margin: string
  padding: string
}>`
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
`
