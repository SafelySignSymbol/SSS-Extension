import React, { Dispatch, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { Box, Divider, IconButton, Menu, MenuItem } from '@mui/material'
import Logo from '../../../_general/components/Logo'
import Spacer from '../../../_general/components/Spacer'
import { Page, Select } from '../../index'
import Avatar from 'boring-avatars'

import { useTranslation } from 'react-i18next'
import { ExtensionAccount } from '../../../_general/model/ExtensionAccount'
import {
  // getActiveAccount,
  getActiveAccountV2,
  Setting,
} from '../../../_general/lib/Storage'
import Color, {
  MainNetColors,
  TestNetColors,
} from '../../../_general/utils/Color'
import { getNetworkTypeByAddress } from '../../../_general/lib/Symbol/Config'
import { NetworkType } from 'symbol-sdk'

export interface Props {
  page: Page
  setPage: Dispatch<Page>
  handleOpen: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleClose: (select: Select) => void
  anchorEl: null | HTMLElement
  update: Date
  setting: Setting
}

const Component: React.VFC<Props> = ({
  page,
  setPage,
  handleOpen,
  handleClose,
  anchorEl,
  update,
  setting,
}) => {
  const [t] = useTranslation()
  const open = Boolean(anchorEl)

  const [extensionAccount, setExtensionAccount] = useState<ExtensionAccount>(
    {} as ExtensionAccount
  )

  useEffect(() => {
    getActiveAccountV2(setting.networkType).then((acc) => {
      setExtensionAccount(acc)
    })
  }, [setting.networkType, update])

  return (
    <Container>
      <Spacer margin="0px 64px">
        <Logo onClick={() => setPage('HOME')} />
      </Spacer>
      <Box sx={{ flexGrow: 1, height: '1px' }} />
      <Spacer margin="0px 16px">
        <Flex>
          <Item isOpen={page === 'HOME'} onClick={() => setPage('HOME')}>
            {t('home')}
          </Item>
          <Divider orientation="vertical" flexItem />
          <Item
            isOpen={page === 'ACCOUNTS'}
            onClick={() => setPage('ACCOUNTS')}>
            {t('account')}
          </Item>
          <Divider orientation="vertical" flexItem />
          <Item isOpen={page === 'ALLOW'} onClick={() => setPage('ALLOW')}>
            {t('allowlist')}
          </Item>
          <Divider orientation="vertical" flexItem />
          <Item isOpen={page === 'HISTORY'} onClick={() => setPage('HISTORY')}>
            {t('history')}
          </Item>
        </Flex>
      </Spacer>
      <Spacer margin="0px 64px">
        <IconButton onClick={handleOpen}>
          {!!extensionAccount.address ? (
            <Avatar
              size={40}
              name={extensionAccount.address}
              variant="beam"
              colors={
                getNetworkTypeByAddress(extensionAccount.address) ===
                NetworkType.MAIN_NET
                  ? MainNetColors
                  : TestNetColors
              }
            />
          ) : (
            <Avatar
              size={40}
              name="default icon"
              variant="beam"
              colors={[
                TestNetColors[0],
                MainNetColors[0],
                TestNetColors[1],
                MainNetColors[1],
              ]}
            />
          )}
        </IconButton>
      </Spacer>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose('NONE')}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}>
        <MenuItem onClick={() => handleClose('SETTING')}>
          {t('iconmenu_setting')}
        </MenuItem>
        <MenuItem onClick={() => handleClose('ACCOUNT')}>
          {t('iconmenu_account')}
        </MenuItem>
      </Menu>
    </Container>
  )
}

export default Component

const Container = styled('div')({
  display: 'flex',
  height: '100px',
  alignItems: 'center',
  background: 'white',
})
const Flex = styled('div')({
  display: 'flex',
  justifyContent: 'center',
})

const Item = styled('div')((p: { isOpen: boolean }) => ({
  margin: '0px 24px',
  cursor: 'pointer',
  padding: '4px 0px',
  fontSize: '18px',
  color: `${p.isOpen ? Color.blue : Color.gray_black}`,
  fontWeight: `${p.isOpen ? 'bold' : 'normal'}`,
}))
