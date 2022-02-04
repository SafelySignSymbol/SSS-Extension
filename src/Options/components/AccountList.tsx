import React from 'react'

import styled from '@emotion/styled'

import { Box } from '@mui/system'

import AccountCard from './AccountCard'
import Typography from '../../_general/components/Typography'

import Color from '../../_general/utils/Color'

import { ExtensionAccount } from '../../_general/model/ExtensionAccount'
import AccountMenu from './AccountMenu'

export type Props = {
  extensionAccounts: ExtensionAccount[]
  reload: () => void
}

const Component: React.VFC<Props> = ({ extensionAccounts, reload }) => {
  if (extensionAccounts.length === 0) return <div></div>

  return (
    <Wrapper>
      {extensionAccounts.map((acc, i) => {
        return (
          <AccountCard
            address={acc.address}
            publicKey={acc.publicKey}
            header={
              <CardHeader>
                <Typography text={`Account ${i + 1}`} variant="h4" />
                <Box sx={{ flexGrow: 1 }} />
                <AccountMenu index={i} reload={reload} />
              </CardHeader>
            }
          />
        )
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
