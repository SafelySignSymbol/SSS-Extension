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
  setActiveAccount,
} from '../../_general/lib/Storage'
import { IconContext } from 'react-icons'
import { RiSettings2Fill } from 'react-icons/ri'

export type Props = {
  index: number
  reload: () => void
}

const Component: React.VFC<Props> = ({ index, reload }) => {
  const [message, setMessage] = useState('')
  const [openSB, setOpenSB] = useState(false)
  const [snackbarStatus, setSnackbarStatus] = useState<AlertColor>('success')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)

  const onClickActive = () => {
    setActiveAccount(index)
      .then(() => {
        setSnackbarStatus('success')
        setMessage('アクティブアカウントを変更しました。')
        setOpenSB(true)
      })
      .finally(() => {
        reload()
        handleClose()
      })
  }

  const onClickDelete = () => {
    deleteExtensionAccount(index)
      .then(() => {
        console.log('success delete')
        setSnackbarStatus('success')
        setMessage('アカウントの登録を解除しました。')
        setOpenSB(true)
      })
      .catch(() => {
        console.log('failed delete')
        setSnackbarStatus('error')
        setMessage('アクティブアカウントを変更してください。')
        setOpenSB(true)
      })
      .finally(() => {
        reload()
        handleClose()
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
        <MenuItem onClick={onClickActive}>ActiveAccountに変更</MenuItem>
        <MenuItem onClick={onClickDelete}>Accountの登録解除</MenuItem>
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
