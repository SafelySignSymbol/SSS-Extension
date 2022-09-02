import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { NetworkType } from 'symbol-sdk'

import {
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
      const account = ExtensionAccount.createExtensionAccount(acc)
      setActiveAccount(account)
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
      <Nettype>
        {setting.networkType === NetworkType.TEST_NET ? 'TEST NET' : 'MAIN NET'}
      </Nettype>
    </Root>
  )
}

export default Options

const Root = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
})

const Nettype = styled('div')({
  position: 'absolute',
  right: '100px',
  top: '100px',
  fontSize: '96px',
  fontWeight: '900',
  zIndex: '-1',
  color: 'white',
})
