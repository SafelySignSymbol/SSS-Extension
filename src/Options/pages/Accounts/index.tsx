import React, { useEffect, useState } from 'react'

import { getExtensionAccounts, Setting } from '../../../_general/lib/Storage'
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
      console.log(setting.networkType)
      const accs = data.filter(
        (acc) => getNetworkTypeByAddress(acc.address) === setting.networkType
      )
      console.log({ accs })
      setAccounts(accs)
    })
  }, [setting.networkType, update])

  return <AccountList extensionAccounts={accounts} reload={reload} />
}

export default Options
