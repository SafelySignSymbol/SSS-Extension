import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'

import Spacer from '../../../_general/components/Spacer'

import { getActiveAccountV2, Setting } from '../../../_general/lib/Storage'
import { ExtensionAccount } from '../../../_general/model/ExtensionAccount'
import Mosaics from './Mosaics'
import { Address, NetworkType } from 'symbol-sdk'
import ActiveAccount from './ActiveAccount'

interface Props {
  reload: () => void
  update: Date
  setting: Setting
}

const Options: React.VFC<Props> = ({ reload, update, setting }) => {
  const [account, setAccount] = useState<ExtensionAccount | null>(null)

  useEffect(() => {
    getActiveAccountV2(setting.networkType).then((acc) => {
      const account = ExtensionAccount.createExtensionAccount(acc)
      setAccount(account)
    })
  }, [setting.networkType, update])

  if (account === null) {
    return <></>
  }

  const adr = Address.createFromRawAddress(account.address)

  return (
    <Wrapper>
      <Spacer margin="48px 8px 40px">
        <ActiveAccount address={adr} name={account.name} />
      </Spacer>
      <Spacer margin="32px 8px">
        <Mosaics address={adr} />
      </Spacer>
      <Nettype>
        {setting.networkType === NetworkType.TEST_NET ? 'TEST NET' : 'MAIN NET'}
      </Nettype>
    </Wrapper>
  )
}

export default Options

const Wrapper = styled('div')({
  minWidth: '60vw',
  width: '1000px',
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
