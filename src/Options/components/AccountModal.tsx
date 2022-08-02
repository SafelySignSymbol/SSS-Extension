import React, { Dispatch, useState } from 'react'
import styled from '@emotion/styled'
import { encrypt } from '../../_general/lib/Crypto'

import {
  Alert,
  AlertColor,
  Divider,
  IconButton,
  ListItemButton,
  MobileStepper,
  Modal,
  Paper,
  Snackbar,
} from '@mui/material'

import { IoMdClose } from 'react-icons/io'

import TextField from '../../_general/components/TextField'
import Spacer from '../../_general/components/Spacer'
import Button from '../../_general/components/Button'
import { Address, Account, NetworkType } from 'symbol-sdk'
import { addExtensionAccount } from '../../_general/lib/Storage'
import { ExtensionAccount } from '../../_general/model/ExtensionAccount'
import PasswordTextField from '../../_general/components/TextField/PasswordTextField'
import { useTranslation } from 'react-i18next'
import Typography from '../../_general/components/Typography'
import Color, { addAlpha } from '../../_general/utils/Color'
import { IconContext } from 'react-icons'
import MethodSelect from './MethodSelect'
import ImportPriKey from './ImportPriKey'
import CreateAccount from './CreateAccount'

import { MdArrowRight, MdArrowLeft } from 'react-icons/md'

export type Props = {
  state: number
  setState: Dispatch<number>
  reload: () => void
}

export type Method = 'IMPORT' | 'CREATE' | 'HARDWARE' | 'NONE'

const Component: React.VFC<Props> = ({ state, setState, reload }) => {
  const [message, setMessage] = useState('')
  const [openSB, setOpenSB] = useState(false)
  const [snackbarStatus, setSnackbarStatus] = useState<AlertColor>('success')

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [prikey, setPrikey] = useState('')
  const [pass, setPass] = useState('default password')

  const [method, setMethod] = useState<Method>('NONE')

  const [t] = useTranslation()

  const closeModal = () => {
    setState(0)
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
      <Modal open={state !== 0} onClose={closeModal}>
        <Wrapper>
          <ModalHeader>
            <Typography variant="h5" text="アカウント追加" />
            <IconButton size="small" onClick={() => setState(0)}>
              <IconContext.Provider value={{ size: '24px' }}>
                <IoMdClose style={{ margin: '6px' }} />
              </IconContext.Provider>
            </IconButton>
          </ModalHeader>
          <Contents>
            <Stepper>
              <MobileStepper
                variant="dots"
                steps={3}
                position="static"
                activeStep={state - 1}
                backButton={undefined}
                nextButton={undefined}
                sx={{
                  '.MuiMobileStepper-dotActive': {
                    background: Color.base_black,
                  },
                }}
              />
            </Stepper>
            {state === 1 && (
              <MethodSelect setState={setState} setMethod={setMethod} />
            )}
            {state === 2 && method === 'IMPORT' && (
              <ImportPriKey
                setName={setName}
                setState={setState}
                setMethod={setMethod}
                setAddress={setAddress}
                setPrivateKey={setPrikey}
                setPassword={setPass}
              />
            )}
            {state === 2 && method === 'CREATE' && (
              <CreateAccount setState={setState} setMethod={setMethod} />
            )}
          </Contents>
          <ButtonWrappr>
            {1 < state && (
              <BackButton onClick={() => setState(state - 1)}>
                <IconContext.Provider value={{ size: '64px' }}>
                  <MdArrowLeft
                    style={{ color: Color.base_white, margin: '0px 16px' }}
                  />
                  <Typography
                    variant="h4"
                    text="Back"
                    color={Color.base_white}
                  />
                </IconContext.Provider>
              </BackButton>
            )}
            {1 < state && (
              <NextButton onClick={() => setState(state + 1)}>
                <Typography
                  variant="h4"
                  text={state === 3 ? 'Done' : 'Next'}
                  color={Color.base_white}
                />
                <IconContext.Provider value={{ size: '64px' }}>
                  <MdArrowRight
                    style={{ color: Color.base_white, margin: '0px 16px' }}
                  />
                </IconContext.Provider>
              </NextButton>
            )}
          </ButtonWrappr>
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
  width: '600px',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
})

const ModalHeader = styled('div')({
  background: Color.base_white,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px',
})

const Contents = styled('div')({
  height: '400px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

const Stepper = styled('div')({
  width: '100%',
  margin: '16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

const ButtonWrappr = styled('div')({
  width: '100%',
  height: '80px',
  display: 'flex',
})

const NextButton = styled('div')({
  width: '50%',
  background: Color.blue,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '> h4': {
    marginLeft: '32px',
  },
})

const BackButton = styled('div')({
  width: '50%',
  background: addAlpha(Color.gray_black, 0.8),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '> h4': {
    marginRight: '32px',
  },
})
