import React, { Dispatch, useRef, useState } from 'react'
import styled from '@emotion/styled'
import { encrypt } from '../../_general/lib/Crypto'

import {
  Alert,
  AlertColor,
  List,
  ListItemButton,
  ListItemText,
  Modal,
  Paper,
  Snackbar,
  Typography,
} from '@mui/material'

import TextField from '../../_general/components/TextField'
import Spacer from '../../_general/components/Spacer'
import Button from '../../_general/components/Button'
import {
  validateRef,
  validateAddress,
  validatePrivateKey,
} from '../../_general/lib/validator'
import { Address, Account, NetworkType } from 'symbol-sdk'
import { addExtensionAccount } from '../../_general/lib/Storage'
import { ExtensionAccount } from '../../_general/model/ExtensionAccount'

export type Props = {
  open: boolean
  setOpen: Dispatch<boolean>
  reload: () => void
}

type ModalStatus = 'PASS' | 'NOPASS' | 'HARD' | 'INIT'
const Component: React.VFC<Props> = ({ open, setOpen, reload }) => {
  const addressRef = useRef<HTMLInputElement>(null)
  const priKeyRef = useRef<HTMLInputElement>(null)
  const passRef = useRef<HTMLInputElement>(null)

  const [status, setStatus] = useState<ModalStatus>('INIT')
  const [message, setMessage] = useState('')
  const [openSB, setOpenSB] = useState(false)
  const [snackbarStatus, setSnackbarStatus] = useState<AlertColor>('success')

  const select = (status: ModalStatus) => {
    setStatus(status)
  }

  const closeModal = () => {
    setStatus('INIT')
    setOpen(false)
  }

  const closeSB = () => {
    setOpenSB(false)
  }
  const resetInput = () => {
    if (!(addressRef === null || addressRef.current === null))
      addressRef.current.value = ''
    if (!(priKeyRef === null || priKeyRef.current === null))
      priKeyRef.current.value = ''
    if (!(passRef === null || passRef.current === null))
      passRef.current.value = ''
  }

  const submit = () => {
    const ad = validateRef(addressRef, validateAddress)
    const pk = validateRef(priKeyRef, validatePrivateKey)
    const ps = validateRef(passRef)

    if (!ad) {
      setSnackbarStatus('error')
      setMessage('アドレスのフォーマットが間違っています。')
    }

    if (status === 'NOPASS' || status === 'PASS') {
      if (!pk) {
        setSnackbarStatus('error')
        setMessage('秘密鍵のフォーマットが間違っています。')
      }
      const addr = Address.createFromRawAddress(ad)
      const acc = Account.createFromPrivateKey(
        pk,
        ad.charAt(0) === 'T' ? NetworkType.TEST_NET : NetworkType.MAIN_NET
      )
      if (addr.plain() !== acc.address.plain()) {
        setSnackbarStatus('error')
        setMessage('秘密鍵とアドレスのペアが一致しません。')
        setOpenSB(true)
      } else {
        const password = status === 'NOPASS' ? '' : ps
        const enpk = encrypt(pk, password)

        const extensionAccount = new ExtensionAccount(
          enpk,
          acc.publicKey,
          acc.address.plain(),
          status
        )

        addExtensionAccount(extensionAccount)
          .then(() => {
            setSnackbarStatus('success')
            setMessage('暗号化秘密鍵を保存しました。')
            setOpenSB(true)
            resetInput()
            closeModal()
            reload()
          })
          .catch(() => {
            setSnackbarStatus('error')
            setMessage('入力されたアドレスは追加済みです。')
            setOpenSB(true)
          })
      }
    }
  }

  const getBody = () => {
    if (status === 'INIT') {
      return (
        <List component="nav" sx={{ width: '100%', margin: '0px 16px' }}>
          <ListItemButton onClick={() => select('NOPASS')}>
            <ListItemText primary="パスワードなしで登録" />
          </ListItemButton>
          <ListItemButton onClick={() => select('PASS')}>
            <ListItemText primary="パスワードありで登録" />
          </ListItemButton>
          <ListItemButton onClick={() => select('HARD')}>
            <ListItemText primary="ハードウェアウォレットで登録 (Comming soon...)" />
          </ListItemButton>
        </List>
      )
    }

    if (status === 'NOPASS') {
      return (
        <Root>
          <Spacer margin="8px">
            <TextField text="Address" inputRef={addressRef} />
          </Spacer>
          <Spacer margin="8px">
            <TextField
              text="Private Key"
              inputRef={priKeyRef}
              type="password"
            />
          </Spacer>
          <Spacer margin="8px">
            <Button text="SUBMIT" onClick={submit} />
          </Spacer>
        </Root>
      )
    }

    if (status === 'PASS') {
      return (
        <Root>
          <Spacer margin="8px">
            <TextField text="Address" inputRef={addressRef} />
          </Spacer>
          <Spacer margin="8px">
            <TextField
              text="Private Key"
              inputRef={priKeyRef}
              type="password"
            />
          </Spacer>
          <Spacer margin="8px">
            <TextField text="Password" inputRef={passRef} type="password" />
          </Spacer>
          <Spacer margin="8px">
            <Button text="SUBMIT" onClick={submit} />
          </Spacer>
        </Root>
      )
    }
  }

  return (
    <>
      <Modal open={open} onClose={closeModal}>
        <Wrapper>
          <Typography
            variant="h4"
            component="div"
            sx={{ display: 'grid', alignItems: 'center' }}>
            アカウント登録
          </Typography>
          {getBody()}
        </Wrapper>
      </Modal>
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

const Wrapper = styled(Paper)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '50vw',
  transform: 'translate(-50%, -50%)',
  padding: '16px',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
})

const Root = styled('div')({
  width: '100%',
  margin: '16px',
})
