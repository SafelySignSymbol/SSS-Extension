import React, { useState } from 'react'

// import styled from '@emotion/styled'
import {
  Alert,
  AlertColor,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
} from '@mui/material'
import {
  deleteExtensionAccount,
  getAccountIndexByAddress,
  setActiveAccountV2,
  Setting,
} from '../../../_general/lib/Storage'
import { IconContext } from 'react-icons'
import { RiSettings2Fill } from 'react-icons/ri'
import { useTranslation } from 'react-i18next'
import { decriptPrivateKey } from '../../../_general/lib/Crypto/core'
import { ExtensionAccount } from '../../../_general/model/ExtensionAccount'

export type Props = {
  account: ExtensionAccount
  reload: () => void
  setting: Setting
}

const Component: React.VFC<Props> = ({ account, reload, setting }) => {
  const [message, setMessage] = useState('')
  const [openSB, setOpenSB] = useState(false)
  const [snackbarStatus, setSnackbarStatus] = useState<AlertColor>('success')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const [t] = useTranslation()
  const open = Boolean(anchorEl)

  const onClickActive = () => {
    getAccountIndexByAddress(account.address).then((index) => {
      console.log('i', index)
      setActiveAccountV2(index, setting.networkType)
        .then(() => {
          setSnackbarStatus('success')
          setMessage(t('accounts_success_change_active'))
          setOpenSB(true)
        })
        .finally(() => {
          reload()
          handleClose()
        })
    })
  }

  const onClickDelete = () => {
    getAccountIndexByAddress(account.address).then((index) => {
      deleteExtensionAccount(index, setting.networkType)
        .then(() => {
          setSnackbarStatus('success')
          setMessage(t('accounts_success_remove_account'))
          setOpenSB(true)
        })
        .catch(() => {
          setSnackbarStatus('error')
          setMessage(t('accounts_failed_remove_account'))
          setOpenSB(true)
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

  const closeSB = () => {
    setOpenSB(false)
  }
  return (
    <>
      <IconButton onClick={handleOpen}>
        <IconContext.Provider value={{ size: '24px' }}>
          <RiSettings2Fill style={{ margin: '6px' }} />
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
      <Snackbar open={openSB} autoHideDuration={6000} onClose={closeSB}>
        <Alert
          onClose={closeSB}
          severity={snackbarStatus}
          sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default Component
