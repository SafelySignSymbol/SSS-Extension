import React, { Dispatch, useState } from 'react'
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
import { useTranslation } from 'react-i18next'

export type Props = {
  open: boolean
  setOpen: Dispatch<boolean>
  reload: () => void
}

const Component: React.VFC<Props> = ({ open, setOpen, reload }) => {
  const [message, setMessage] = useState('')
  const [openSB, setOpenSB] = useState(false)
  const [snackbarStatus, setSnackbarStatus] = useState<AlertColor>('success')

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [prikey, setPrikey] = useState('')
  const [pass, setPass] = useState('default password')
  const [isVPK, setIsVPK] = useState(false)
  const [isVPass, setIsVPass] = useState(false)

  const [t] = useTranslation()

  const closeModal = () => {
    setOpen(false)
  }

  const closeSB = () => {
    setOpenSB(false)
  }
  const resetInput = () => {
    setName('')
    setAddress('')
    setPrikey('')
    setPass('')
  }

  const submit = () => {
    const ad = address
    const pk = prikey
    const ps = pass

    if (!ad) {
      setSnackbarStatus('error')
      setMessage(t('accmodal_wrong_address_format'))
    }

    if (!pk) {
      setSnackbarStatus('error')
      setMessage(t('accmodal_wrong_prikey_format'))
    }
    const addr = Address.createFromRawAddress(ad)
    const acc = Account.createFromPrivateKey(
      pk,
      ad.charAt(0) === 'T' ? NetworkType.TEST_NET : NetworkType.MAIN_NET
    )
    if (addr.plain() !== acc.address.plain()) {
      setSnackbarStatus('error')
      setMessage(t('accmodal_wrong_keypair'))
      setOpenSB(true)
    } else {
      const seed = Math.floor((Math.random() * 10000) % 1000)
      const enpk = encrypt(pk, ps, seed)

      const extensionAccount = new ExtensionAccount(
        name,
        enpk,
        acc.publicKey,
        acc.address.plain(),
        'PASS',
        seed
      )

      addExtensionAccount(extensionAccount)
        .then(() => {
          setSnackbarStatus('success')
          setMessage(t('accmodal_success_register'))
          setOpenSB(true)
          resetInput()
          closeModal()
          reload()
        })
        .catch(() => {
          setSnackbarStatus('error')
          setMessage(t('accmodal_allready_added'))
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
                {t('accmodal_signup')}
              </Typography>
            </Spacer>
          </Title>
          <Root>
            <Spacer margin="8px">
              <TextField label="Name" setText={setName} />
            </Spacer>
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
                <Button text={t('accmodal_submit')} onClick={submit} />
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
