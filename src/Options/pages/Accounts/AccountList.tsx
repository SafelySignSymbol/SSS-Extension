import React, { useEffect, useState } from 'react'

import styled from '@emotion/styled'

import Typography from '../../../_general/components/Typography'

import Color from '../../../_general/utils/Color'

import { ExtensionAccount } from '../../../_general/model/ExtensionAccount'
import { Chip, IconButton } from '@mui/material'
import { IconContext } from 'react-icons'
import { HiOutlineClipboardCopy } from 'react-icons/hi'
import AccountMenu from './AccountMenu'
import { getActiveAccount } from '../../../_general/lib/Storage'

export type Props = {
  extensionAccounts: ExtensionAccount[]
  reload: () => void
}

const Component: React.VFC<Props> = ({ extensionAccounts, reload }) => {
  const [activeAccount, setActiveAccount] = useState<string>('')

  useEffect(() => {
    getActiveAccount().then((acc) => {
      setActiveAccount(acc.address)
    })
  }, [extensionAccounts])

  if (extensionAccounts.length === 0) return <div></div>

  return (
    <Root>
      {extensionAccounts.map((acc, i) => {
        const net_type = acc.address.charAt(0) === 'T' ? 'TEST NET' : 'MAIN NET'
        const color: string = (() => {
          if (net_type === 'TEST NET') {
            return 'black'
          } else {
            return Color.sky
          }
        })()
        const copy = (value: string) => {
          navigator.clipboard.writeText(value)
        }

        const name = acc.name || `Account ${i + 1}`
        return (
          <Wrapper>
            <Name>
              <IsActive isActive={acc.address === activeAccount}>
                <Typography text={name} variant="h5" />
              </IsActive>
              <div>
                <SChip label={net_type} clr={color} />
                <AccountMenu index={i} reload={reload} />
              </div>
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

const SChip = styled(Chip)((p: { clr: string }) => ({
  margin: '0px 16px',
  color: p.clr,
}))

const IsActive = styled('span')((p: { isActive: boolean }) => ({
  display: 'flex',
  ':after': {
    content: '"*"',
    fontSize: '32px',
    marginLeft: '16px',
    color: `${p.isActive ? Color.sky : 'white'}`,
  },
}))
