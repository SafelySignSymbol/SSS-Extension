import React, { Dispatch, useRef, useState } from 'react'
import styled from '@emotion/styled'
import { encrypt } from '../../_general/lib/Crypto'

import {
  Alert,
  AlertColor,
  Modal,
  Paper,
  Snackbar,
  Typography,
} from '@mui/material'

import TextField from '../../_general/components/TextField'
import Spacer from '../../_general/components/Spacer'
import Button from '../../_general/components/Button'
import { Address, Account, NetworkType } from 'symbol-sdk'
import { addExtensionAccount } from '../../_general/lib/Storage'
import { ExtensionAccount } from '../../_general/model/ExtensionAccount'
import PasswordTextField from '../../_general/components/TextField/PasswordTextField'

export type Props = {
  open: boolean
  setOpen: Dispatch<boolean>
  reload: () => void
}

const Component: React.VFC<Props> = ({ open, setOpen, reload }) => {
  const addressRef = useRef<HTMLInputElement>(null)
  const priKeyRef = useRef<HTMLInputElement>(null)
  const passRef = useRef<HTMLInputElement>(null)

  const [message, setMessage] = useState('')
  const [openSB, setOpenSB] = useState(false)
  const [snackbarStatus, setSnackbarStatus] = useState<AlertColor>('success')

  const [address, setAddress] = useState('')
  const [prikey, setPrikey] = useState('')
  const [pass, setPass] = useState('default password')
  const [isVPK, setIsVPK] = useState(false)
  const [isVPass, setIsVPass] = useState(false)

  const closeModal = () => {
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
    const ad = address
    const pk = prikey
    const ps = pass

    if (!ad) {
      setSnackbarStatus('error')
      setMessage('アドレスのフォーマットが間違っています。')
    }

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
      const enpk = encrypt(pk, ps)

      const extensionAccount = new ExtensionAccount(
        enpk,
        acc.publicKey,
        acc.address.plain(),
        'PASS'
      )

      addExtensionAccount(extensionAccount)
        .then(() => {
          setSnackbarStatus('success')
          setMessage('暗号化秘密鍵を保存しました。')
          setOpenSB(true)
          resetInput()
          closeModal()
          setInterval(() => {
            reload()
          }, 100)
        })
        .catch(() => {
          setSnackbarStatus('error')
          setMessage('入力されたアドレスは追加済みです。')
          setOpenSB(true)
        })
    }
  }

  return (
    <>
      <Modal open={open} onClose={closeModal}>
        <Wrapper>
          <Title>
            <Spacer margin="32px 64px">
              <Typography variant="h4" component="div">
                Sign up
              </Typography>
            </Spacer>
          </Title>
          <Root>
            <Spacer margin="8px">
              <TextField label="Address" setText={setAddress} />
            </Spacer>
            <Spacer margin="8px">
              <PasswordTextField
                label="Private Key"
                setPass={setPrikey}
                isVisible={isVPK}
                updateIsVisible={() => setIsVPK((prev) => !prev)}
              />
            </Spacer>
            <Spacer margin="8px">
              <PasswordTextField
                label="Password"
                setPass={setPass}
                isVisible={isVPass}
                updateIsVisible={() => setIsVPass((prev) => !prev)}
              />
            </Spacer>
            <Spacer margin="32px">
              <Right>
                <Button text="SUBMIT" onClick={submit} />
              </Right>
            </Spacer>
          </Root>
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

const Right = styled('div')({
  display: 'flex',
  justifyContent: 'end',
})

const Title = styled('div')({
  width: 'calc(100% - 64px)',
})
