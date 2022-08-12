import React from 'react'

import styled from '@emotion/styled'

import Typography from '../../../_general/components/Typography'

import Color from '../../../_general/utils/Color'

import { ExtensionAccount } from '../../../_general/model/ExtensionAccount'
import { Chip, IconButton } from '@mui/material'
import { IconContext } from 'react-icons'
import { HiOutlineClipboardCopy } from 'react-icons/hi'
import AccountMenu from './AccountMenu'
import { Setting } from '../../../_general/lib/Storage'
import { NetworkType } from 'symbol-sdk'
import { getNetworkTypeByAddress } from '../../../_general/lib/Symbol/Config'

export type Props = {
  activeAccount: ExtensionAccount
  setting: Setting
  reload: () => void
}

const Component: React.VFC<Props> = ({ activeAccount, reload, setting }) => {
  const copy = (value: string) => {
    navigator.clipboard.writeText(value)
  }

  const net_type = getNetworkTypeByAddress(activeAccount.address)

  const color: string = (() => {
    if (net_type === NetworkType.TEST_NET) {
      return 'black'
    } else {
      return Color.sky
    }
  })()

  return (
    <Root>
      <Wrapper>
        <Name>
          <Typography text={activeAccount.name} variant="h5" />
          <div>
            <SChip
              label={
                net_type === NetworkType.TEST_NET ? 'TEST NET' : 'MAIN NET'
              }
              clr={color}
            />
            <AccountMenu
              account={activeAccount}
              reload={reload}
              setting={setting}
            />
          </div>
        </Name>
        <Flex>
          <div>
            <Typography text="Address" variant="h5" />
            <Typography text={activeAccount.address} variant="h6" />
          </div>
          <IconButton size="small" onClick={() => copy(activeAccount.address)}>
            <IconContext.Provider value={{ size: '24px' }}>
              <HiOutlineClipboardCopy style={{ margin: '6px' }} />
            </IconContext.Provider>
          </IconButton>
        </Flex>
        <Flex>
          <div>
            <Typography text="PublicKey" variant="h5" />
            <Typography text={activeAccount.publicKey} variant="h6" />
          </div>
          <IconButton
            size="small"
            onClick={() => copy(activeAccount.publicKey)}>
            <IconContext.Provider value={{ size: '24px' }}>
              <HiOutlineClipboardCopy style={{ margin: '6px' }} />
            </IconContext.Provider>
          </IconButton>
        </Flex>
      </Wrapper>
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
  margin: '64px 10vw 0px',
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

const SChip = styled(Chip)((p: { clr: string }) => ({
  margin: '0px 16px',
  color: p.clr,
}))
