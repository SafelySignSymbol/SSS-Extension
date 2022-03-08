import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'

import { getExtensionAccounts } from '../../../_general/lib/Storage'
import { ExtensionAccount } from '../../../_general/model/ExtensionAccount'
import AccountList from '../../components/AccountList'
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

  return (
    <Wrapper>
      <div>Accounts List</div>
      <AccountList extensionAccounts={accounts} reload={reload} />
    </Wrapper>
  )
}

export default Options

const Wrapper = styled('div')({
  margin: '32px 80px',
  width: 'calc(100vw - 64px)',
})
