import React, { useEffect, useState } from 'react'

import {
  getActiveAccountV2,
  getExtensionAccounts,
  Setting,
} from '../../../_general/lib/Storage'
import { getNetworkTypeByAddress } from '../../../_general/lib/Symbol/Config'
import { ExtensionAccount } from '../../../_general/model/ExtensionAccount'
import AccountList from './AccountList'
interface Props {
  reload: () => void
  update: Date
  setting: Setting
}

const Options: React.VFC<Props> = ({ reload, update, setting }) => {
  const [accounts, setAccounts] = useState<ExtensionAccount[]>([])

  useEffect(() => {
    getExtensionAccounts().then((data) => {
      const accs: ExtensionAccount[] = []
      getActiveAccountV2(setting.networkType).then((acc) => {
        accs.push(acc)
      })
      const tmp = data.filter(
        (acc) => getNetworkTypeByAddress(acc.address) === setting.networkType
      )

      accs.push(...tmp)

      setAccounts(accs)
    })
  }, [setting.networkType, update])

  return (
    <AccountList
      extensionAccounts={accounts}
      reload={reload}
      setting={setting}
    />
  )
}

export default Options
