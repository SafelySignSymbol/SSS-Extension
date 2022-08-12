import React, { useEffect, useState } from 'react'

import styled from '@emotion/styled'

import Typography from '../../../_general/components/Typography'

import Color from '../../../_general/utils/Color'

import { ExtensionAccount } from '../../../_general/model/ExtensionAccount'
import { Chip, IconButton } from '@mui/material'
import { IconContext } from 'react-icons'
import { HiOutlineClipboardCopy } from 'react-icons/hi'
import AccountMenu from './AccountMenu'
import {
  // getActiveAccount,
  getActiveAccountV2,
  Setting,
} from '../../../_general/lib/Storage'
import { getNetworkTypeByAddress } from '../../../_general/lib/Symbol/Config'
import { NetworkType } from 'symbol-sdk'

export type Props = {
  extensionAccounts: ExtensionAccount[]
  setting: Setting
  reload: () => void
}

const Component: React.VFC<Props> = ({
  extensionAccounts,
  reload,
  setting,
}) => {
  const [activeAccount, setActiveAccount] = useState<string>('')

  useEffect(() => {
    // getActive Account().then((acc) => {
    //   setActiveAccount(acc.address)
    // })
    getActiveAccountV2(setting.networkType).then((acc) => {
      setActiveAccount(acc.address)
    })
  }, [extensionAccounts, setting.networkType])

  if (extensionAccounts.length === 0) return <div></div>

  return (
    <Root>
      {extensionAccounts.map((acc, i) => {
        const copy = (value: string) => {
          navigator.clipboard.writeText(value)
        }

        const name = acc.name || `Account ${i + 1}`
        return (
          <Wrapper>
            <Name>
              <Typography text={name} variant="h5" />
              <AccountMenu account={acc} reload={reload} setting={setting} />
            </Name>
            <Flex>
              <div>
                <Typography text="Address" variant="h5" />
                <Typography text={acc.address} variant="h6" />
              </div>
              <IconButton size="small" onClick={() => copy(acc.address)}>
                <IconContext.Provider value={{ size: '24px' }}>
                  <HiOutlineClipboardCopy style={{ margin: '6px' }} />
                </IconContext.Provider>
              </IconButton>
            </Flex>
            <Flex>
              <div>
                <Typography text="PublicKey" variant="h5" />
                <Typography text={acc.publicKey} variant="h6" />
              </div>
              <IconButton size="small" onClick={() => copy(acc.publicKey)}>
                <IconContext.Provider value={{ size: '24px' }}>
                  <HiOutlineClipboardCopy style={{ margin: '6px' }} />
                </IconContext.Provider>
              </IconButton>
            </Flex>
          </Wrapper>
        )
      })}
    </Root>
  )
}

export default Component

const Wrapper = styled('div')({
  background: 'white',
  padding: '16px',
  margin: '8px',
})

const Root = styled('div')({
  margin: '32px 10vw',
  minWidth: '60vw',
  width: '800px',
})

const Flex = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: '8px',
})

const Name = styled('div')({
  marginBottom: '8px',
  display: 'flex',
  justifyContent: 'space-between',
})
