import React from 'react'

import styled from '@emotion/styled'

import { Box } from '@mui/system'

import Typography from '../../_general/components/Typography'

import Color from '../../_general/utils/Color'
import { SignedTransaction } from 'symbol-sdk'

export type Props = {
  allowlist: string[]
  reload: () => void
}

const Component: React.VFC<Props> = ({ allowlist, reload }) => {
  if (allowlist.length === 0) return <div></div>

  return (
    <Wrapper>
      {allowlist.map((e, i) => {
        return <Typography key={i} text={e} variant="h5" />
      })}
    </Wrapper>
  )
}

export default Component

const Wrapper = styled('div')({
  width: 'calc(100% - 64px)',
  margin: '16px',
  padding: '16px',
  display: 'flex',
  flexFlow: 'row wrap',
  border: '1px solid ' + Color.sky,
  borderRadius: '32px',
})

const CardHeader = styled('div')({
  margin: '8px',
  display: 'flex',
  alignItems: 'center',
})
