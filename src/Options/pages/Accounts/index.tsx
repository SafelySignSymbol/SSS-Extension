import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'

import { getExtensionAccounts } from '../../../_general/lib/Storage'
import { ExtensionAccount } from '../../../_general/model/ExtensionAccount'
import AccountList from './AccountList'
interface Props {
  reload: () => void
  update: Date
}

const Options: React.VFC<Props> = ({ reload, update }) => {
  const [accounts, setAccounts] = useState<ExtensionAccount[]>([])

  useEffect(() => {
    getExtensionAccounts().then((data) => {
      console.log('accs', data)
      setAccounts(data)
    })
  }, [update])

  return <AccountList extensionAccounts={accounts} reload={reload} />
}

export default Options
