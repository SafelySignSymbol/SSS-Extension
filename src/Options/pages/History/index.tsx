import React, { useEffect, useState } from 'react'

import { getExtensionAccounts } from '../../../_general/lib/Storage'
import { ExtensionAccount } from '../../../_general/model/ExtensionAccount'
interface Props {
  reload: () => void
  update: Date
}

const Options: React.VFC<Props> = ({ reload, update }) => {
  const [accounts, setAccounts] = useState<ExtensionAccount[]>([])

  useEffect(() => {
    getExtensionAccounts().then((data) => {
      setAccounts(data)
    })
  }, [update])

  return <div>HISTORY PAGE</div>
}

export default Options
