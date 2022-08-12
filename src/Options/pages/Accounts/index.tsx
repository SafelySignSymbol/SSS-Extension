import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'

import {
  getActiveAccount,
  getActiveAccountV2,
  getExtensionAccounts,
  Setting,
} from '../../../_general/lib/Storage'
import { getNetworkTypeByAddress } from '../../../_general/lib/Symbol/Config'
import { ExtensionAccount } from '../../../_general/model/ExtensionAccount'
import AccountList from './AccountList'
import ActiveAccount from './ActiveAccount'
interface Props {
  reload: () => void
  update: Date
  setting: Setting
}

const Options: React.VFC<Props> = ({ reload, update, setting }) => {
  const [accounts, setAccounts] = useState<ExtensionAccount[]>([])
  const [activeAccount, setActiveAccount] =
    useState<ExtensionAccount | null>(null)

  useEffect(() => {
    getActiveAccountV2(setting.networkType).then((acc) => {
      setActiveAccount(acc)
    })
    getExtensionAccounts().then((data) => {
      const accs: ExtensionAccount[] = []
      const tmp = data.filter(
        (acc) => getNetworkTypeByAddress(acc.address) === setting.networkType
      )

      accs.push(...tmp)
      console.log({ accs })
      setAccounts(accs)
    })
  }, [setting.networkType, update])

  return (
    <Root>
      {activeAccount !== null && (
        <ActiveAccount
          activeAccount={activeAccount}
          reload={reload}
          setting={setting}
        />
      )}
      <AccountList
        extensionAccounts={accounts.filter(
          (a) => a.address !== activeAccount?.address
        )}
        reload={reload}
        setting={setting}
      />
      <Nettype>TEST NET</Nettype>
    </Root>
  )
}

export default Options

const Root = styled('div')({
  display: 'flex',
  flexDirection: 'column',
})

const Nettype = styled('div')({
  position: 'absolute',
  right: '200px',
  top: '80px',
  fontSize: '64px',
  zIndex: '-1',
  color: 'white',
})
