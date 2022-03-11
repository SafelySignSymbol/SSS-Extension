import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'

import { Grid } from '@mui/material'

import Spacer from '../../../_general/components/Spacer'

import { getActiveAccount } from '../../../_general/lib/Storage'
import { ExtensionAccount } from '../../../_general/model/ExtensionAccount'
import Mosaics from './Mosaics'
import { Address } from 'symbol-sdk'
import ActiveAccount from './ActiveAccount'
import TransactionHistory from './TransactionHistory'

interface Props {
  reload: () => void
  update: Date
}

const Options: React.VFC<Props> = ({ reload, update }) => {
  const [account, setAccount] = useState<ExtensionAccount | null>(null)

  useEffect(() => {
    getActiveAccount().then((acc) => {
      setAccount(acc)
    })
  }, [update])

  if (account === null) {
    return <></>
  }

  const adr = Address.createFromRawAddress(account.address)

  return (
    <Wrapper>
      <Grid container>
        <Grid item xs={4}>
          <Spacer margin="32px 8px">
            <ActiveAccount address={adr} />
          </Spacer>
          <Spacer margin="32px 8px">
            <Mosaics address={adr} />
          </Spacer>
        </Grid>
        <Grid item xs={8}>
          <Spacer margin="32px 8px">
            <Wrap>
              <TransactionHistory address={adr} />
            </Wrap>
          </Spacer>
        </Grid>
      </Grid>
    </Wrapper>
  )
}

export default Options

const Wrapper = styled('div')({
  margin: '16px 80px',
  width: 'calc(100vw - 64px)',
})

const Wrap = styled('div')({
  height: 'calc(100vh - 176px)',
})
