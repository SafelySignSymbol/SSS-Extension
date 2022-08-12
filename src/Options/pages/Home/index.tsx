import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'

import Spacer from '../../../_general/components/Spacer'

import { getActiveAccountV2, Setting } from '../../../_general/lib/Storage'
import { ExtensionAccount } from '../../../_general/model/ExtensionAccount'
import Mosaics from './Mosaics'
import { Address } from 'symbol-sdk'
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
      console.log({ setting: setting.networkType })
      setAccount(acc)
    })
  }, [setting.networkType, update])

  if (account === null) {
    return <></>
  }

  const adr = Address.createFromRawAddress(account.address)

  return (
    <Wrapper>
      <Spacer margin="32px 8px">
        <ActiveAccount address={adr} />
      </Spacer>
      <Spacer margin="32px 8px">
        <Mosaics address={adr} />
      </Spacer>
    </Wrapper>
  )
}

export default Options

const Wrapper = styled('div')({
  margin: '16px 10vw',
  width: '80vw',
})
