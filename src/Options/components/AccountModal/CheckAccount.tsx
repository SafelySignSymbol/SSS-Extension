import React from 'react'
import styled from '@emotion/styled'

import Typography from '../../../_general/components/Typography'

import { InactiveTextField } from '../../../_general/components/TextField'
import { useTranslation } from 'react-i18next'
export type Props = {
  name: string
  address: string
  password: string
}

const Component: React.FC<Props> = ({ name, address, password }) => {
  const [t] = useTranslation()

  return (
    <Root>
      <Center>
        <Typography fontSize={24} text={t('accmodal_check')} />
      </Center>
      <InactiveTextField label="Name" value={name} variant="text" />
      <InactiveTextField label="Address" value={address} variant="text" />
      {!!password && (
        <InactiveTextField label="Password" value={password} variant="text" />
      )}
    </Root>
  )
}

export default Component

const Root = styled('div')({
  width: 'calc(100% - 64px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
})

const Center = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '32px',
  '> *': {
    margin: '4px',
  },
})
