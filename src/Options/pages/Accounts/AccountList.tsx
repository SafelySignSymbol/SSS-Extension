import React, { useEffect } from 'react'

import styled from '@emotion/styled'

import Typography from '../../../_general/components/Typography'

import { ExtensionAccount } from '../../../_general/model/ExtensionAccount'
import { IconButton } from '@mui/material'
import { IconContext } from 'react-icons'
import { HiOutlineClipboardCopy } from 'react-icons/hi'
import AccountMenu from './AccountMenu'
import { Setting } from '../../../_general/lib/Storage'

import Avatar from 'boring-avatars'
import { NetworkType } from 'symbol-sdk'
import { getNetworkTypeByAddress } from '../../../_general/lib/Symbol/Config'
import { MainNetColors, TestNetColors } from '../../../_general/utils/Color'
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
  useEffect(() => {}, [extensionAccounts, setting.networkType])

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
              <NameWrpper>
                <AvatarWrapper>
                  <Avatar
                    size={32}
                    name={acc.address}
                    variant="beam"
                    colors={
                      getNetworkTypeByAddress(acc.address) ===
                      NetworkType.MAIN_NET
                        ? MainNetColors
                        : TestNetColors
                    }
                  />
                </AvatarWrapper>
                <Typography text={name} fontSize={28} />
              </NameWrpper>
              <AccountMenu account={acc} reload={reload} setting={setting} />
            </Name>
            <Flex isLast={false}>
              <VerticalMargin>
                <Typography text="Address" fontSize={24} />
                <Typography text={acc.address} fontSize={20} />
              </VerticalMargin>
              <IconButton size="small" onClick={() => copy(acc.address)}>
                <IconContext.Provider value={{ size: '24px' }}>
                  <HiOutlineClipboardCopy style={{ margin: '6px' }} />
                </IconContext.Provider>
              </IconButton>
            </Flex>
            <Flex isLast={true}>
              <VerticalMargin>
                <Typography text="PublicKey" fontSize={24} />
                <Typography text={acc.publicKey} fontSize={20} />
              </VerticalMargin>
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
  padding: '40px',
  margin: '16px 8px',
})

const Root = styled('div')({
  minWidth: '60vw',
  width: '800px',
})

const Flex = styled('div')((p: { isLast: boolean }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: p.isLast ? '0px' : '12px',
}))

const Name = styled('div')({
  marginBottom: '8px',
  display: 'flex',
  justifyContent: 'space-between',
})

const AvatarWrapper = styled('div')({
  marginRight: '16px',
})

const NameWrpper = styled('div')({
  display: 'flex',
  alignItems: 'center',
})

const VerticalMargin = styled('div')({
  ':nth-child(1)': {
    marginBottom: '4px',
  },
})
