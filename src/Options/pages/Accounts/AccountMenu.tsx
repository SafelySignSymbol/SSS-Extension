import React, { useState } from 'react'

// import styled from '@emotion/styled'
import { IconButton, Menu, MenuItem } from '@mui/material'
import {
  deleteExtensionAccount,
  getAccountIndexByAddress,
  setActiveAccountV2,
  Setting,
} from '../../../_general/lib/Storage'
import { IconContext } from 'react-icons'
import { RiSettings2Fill } from 'react-icons/ri'
import { useTranslation } from 'react-i18next'
import { ExtensionAccount } from '../../../_general/model/ExtensionAccount'
import Color from '../../../_general/utils/Color'
import {
  Snackbar,
  SnackbarProps,
  SnackbarType,
} from '../../../_general/components/Snackbar'

export type Props = {
  account: ExtensionAccount
  reload: () => void
  setting: Setting
}

const Component: React.VFC<Props> = ({ account, reload, setting }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const [t] = useTranslation()
  const open = Boolean(anchorEl)
  const [snackbar, setSnackbar] = useState<SnackbarProps>({} as SnackbarProps)

  const onClickActive = () => {
    if (!window.confirm('realy ?')) return
    getAccountIndexByAddress(account.address).then((index) => {
      console.log('i', index)
      setActiveAccountV2(index, setting.networkType)
        .then(() => {
          setSnackbar({
            isOpen: true,
            snackbarMessage: t('accounts_success_change_active'),
            snackbarStatus: SnackbarType.SUCCESS,
          })
        })
        .finally(() => {
          reload()
          handleClose()
        })
    })
  }

  const onClickDelete = () => {
    if (!window.confirm('realy ?')) return
    getAccountIndexByAddress(account.address).then((index) => {
      deleteExtensionAccount(index, setting.networkType)
        .then(() => {
          setSnackbar({
            isOpen: true,
            snackbarMessage: t('accounts_success_remove_account'),
            snackbarStatus: SnackbarType.SUCCESS,
          })
        })
        .catch(() => {
          setSnackbar({
            isOpen: true,
            snackbarMessage: t('accounts_failed_remove_account'),
            snackbarStatus: SnackbarType.ERROR,
          })
        })
        .finally(() => {
          reload()
          handleClose()
        })
    })
  }

  const handleOpen = (event: {
    currentTarget: React.SetStateAction<HTMLElement | null>
  }) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton onClick={handleOpen}>
        <IconContext.Provider value={{ size: '24px' }}>
          <RiSettings2Fill style={{ margin: '6px', color: Color.gray_black }} />
        </IconContext.Provider>
      </IconButton>
      <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
        <MenuItem onClick={onClickActive}>
          {t('accounts_change_active')}
        </MenuItem>
        <MenuItem onClick={onClickDelete}>
          {t('accounts_remove_account')}
        </MenuItem>
      </Menu>
      <Snackbar
        isOpen={snackbar.isOpen}
        snackbarMessage={snackbar.snackbarMessage}
        snackbarStatus={snackbar.snackbarStatus}
      />
    </>
  )
}

export default Component
