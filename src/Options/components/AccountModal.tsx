import React, { Dispatch, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { encrypt } from '../../_general/lib/Crypto'

import {
  Alert,
  AlertColor,
  IconButton,
  MobileStepper,
  Modal,
  Paper,
  Snackbar,
} from '@mui/material'

import { IoMdClose } from 'react-icons/io'

import { Address, Account, NetworkType } from 'symbol-sdk'
import { addExtensionAccount } from '../../_general/lib/Storage'
import { ExtensionAccount } from '../../_general/model/ExtensionAccount'
import { useTranslation } from 'react-i18next'
import Typography from '../../_general/components/Typography'
import Color, { addAlpha } from '../../_general/utils/Color'
import { IconContext } from 'react-icons'
import MethodSelect from './MethodSelect'
import ImportPriKey from './ImportPriKey'
import CreateAccount from './CreateAccount'

import { MdArrowRight, MdArrowLeft } from 'react-icons/md'
import { getNetworkTypeByAddress } from '../../_general/lib/Symbol/Config'
import CheckAccount from './CheckAccount'

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
  const [nettype, setNettype] = useState<NetworkType>(NetworkType.TEST_NET)

  const [t] = useTranslation()

  useEffect(() => {
    if (method === 'CREATE') {
      const acc = Account.generateNewAccount(nettype)
      setAddress(acc.address.plain())
      setPrikey(acc.privateKey)
    }
  }, [method, nettype])

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

  const getBody = () => {
    if (state === 1) {
      return (
        <MethodSelect
          setState={setState}
          setMethod={setMethod}
          setNettype={setNettype}
        />
      )
    }

    if (state === 2) {
      if (method === 'IMPORT') {
        return (
          <ImportPriKey
            setName={setName}
            setAddress={setAddress}
            setPrivateKey={setPrikey}
            setPassword={setPass}
          />
        )
      }

      if (method === 'CREATE') {
        return (
          <CreateAccount
            setPassword={setPass}
            setName={setName}
            address={address}
          />
        )
      }
    }

    if (state === 3) {
      return <CheckAccount address={address} name={name} password={pass} />
    }
  }

  const getFooter = () => {
    if (state === 1) {
      return <ButtonWrappr />
    }
    if (state === 2) {
      if (method === 'IMPORT') {
        return (
          <ButtonWrappr>
            <BackButton onClick={() => setState(state - 1)}>
              <IconContext.Provider value={{ size: '64px' }}>
                <MdArrowLeft
                  style={{ color: Color.base_white, margin: '0px 16px' }}
                />
                <Typography variant="h4" text="Back" color={Color.base_white} />
              </IconContext.Provider>
            </BackButton>
            <NextButton onClick={nextImport}>
              <Typography variant="h4" text="Next" color={Color.base_white} />
              <IconContext.Provider value={{ size: '64px' }}>
                <MdArrowRight
                  style={{ color: Color.base_white, margin: '0px 16px' }}
                />
              </IconContext.Provider>
            </NextButton>
          </ButtonWrappr>
        )
      }
      if (method === 'CREATE') {
        return (
          <ButtonWrappr>
            <BackButton onClick={() => setState(state - 1)}>
              <IconContext.Provider value={{ size: '64px' }}>
                <MdArrowLeft
                  style={{ color: Color.base_white, margin: '0px 16px' }}
                />
                <Typography variant="h4" text="Back" color={Color.base_white} />
              </IconContext.Provider>
            </BackButton>
            <NextButton onClick={nextCreate}>
              <Typography variant="h4" text="Next" color={Color.base_white} />
              <IconContext.Provider value={{ size: '64px' }}>
                <MdArrowRight
                  style={{ color: Color.base_white, margin: '0px 16px' }}
                />
              </IconContext.Provider>
            </NextButton>
          </ButtonWrappr>
        )
      }
    }

    if (state === 3) {
      return (
        <ButtonWrappr>
          <BackButton onClick={() => setState(state - 1)}>
            <IconContext.Provider value={{ size: '64px' }}>
              <MdArrowLeft
                style={{ color: Color.base_white, margin: '0px 16px' }}
              />
              <Typography variant="h4" text="Back" color={Color.base_white} />
            </IconContext.Provider>
          </BackButton>
          <NextButton onClick={submit}>
            <Typography variant="h4" text="Done" color={Color.base_white} />
            <IconContext.Provider value={{ size: '64px' }}>
              <MdArrowRight
                style={{ color: Color.base_white, margin: '0px 16px' }}
              />
            </IconContext.Provider>
          </NextButton>
        </ButtonWrappr>
      )
    }
  }

  const nextImport = () => {
    if (!address) {
      setSnackbarStatus('error')
      setMessage(t('accmodal_wrong_address_format'))
      return
    }

    if (!prikey) {
      setSnackbarStatus('error')
      setMessage(t('accmodal_wrong_prikey_format'))
      return
    }

    const nt = getNetworkTypeByAddress(address)
    const addr = Address.createFromRawAddress(address)
    const acc = Account.createFromPrivateKey(prikey, nt)

    if (addr.plain() !== acc.address.plain()) {
      setSnackbarStatus('error')
      setMessage(t('accmodal_wrong_keypair'))
      setOpenSB(true)
    } else {
      // TODO password check
      setState(state + 1)
    }
  }

  const nextCreate = () => {
    // TODO password check
    setState(state + 1)
  }

  return (
    <>
      <Modal open={state !== 0} onClose={closeModal}>
        <Wrapper>
          <ModalHeader>
            <Typography variant="h5" text={t('accmodal_signup')} />
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
            {getBody()}
          </Contents>
          {getFooter()}
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
  cursor: 'pointer',
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
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '> h4': {
    marginRight: '32px',
  },
})
