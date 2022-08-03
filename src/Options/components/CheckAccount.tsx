import React, { Dispatch, useEffect, useState } from 'react'
import styled from '@emotion/styled'

import Typography from '../../_general/components/Typography'

import TextField, {
  InactiveTextField,
} from '../../_general/components/TextField'
export type Props = {
  name: string
  address: string
  password: string
}

const Component: React.FC<Props> = ({ name, address, password }) => {
  return (
    <Root>
      <Center>
        <Typography variant="h5" text="アカウントを確認" />
      </Center>
      <InactiveTextField label="Name" value={name} variant="text" />
      <InactiveTextField label="Address" value={address} variant="text" />
      <InactiveTextField label="Password" value={password} variant="text" />
    </Root>
  )
}

export default Component

const Root = styled('div')({
  width: 'calc(100% - 32px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
})

const Center = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '16px 0px',
  '> *': {
    margin: '4px',
  },
})