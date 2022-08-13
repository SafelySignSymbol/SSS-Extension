import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { Address } from 'symbol-sdk'

import { getActiveAccountV2, Setting } from '../../../_general/lib/Storage'
import { ExtensionAccount } from '../../../_general/model/ExtensionAccount'
import TransactionHistory from './TransactionHistory'
interface Props {
  reload: () => void
  update: Date
  setting: Setting
}

const Options: React.VFC<Props> = ({ reload, update, setting }) => {
  const [activeAccount, setActiveAccount] =
    useState<ExtensionAccount | null>(null)
  useEffect(() => {
    getActiveAccountV2(setting.networkType).then((data) => {
      setActiveAccount(data)
    })
  }, [setting.networkType])

  if (activeAccount === null) {
    return <></>
  }

  return (
    <Root>
      <TransactionHistory
        address={Address.createFromRawAddress(
          activeAccount.address
        )}></TransactionHistory>
    </Root>
  )
}

export default Options

const Root = styled('div')({
  margin: '32px 10vw',
  width: '80vw',
  height: 'calc(100%-80px)',
})
