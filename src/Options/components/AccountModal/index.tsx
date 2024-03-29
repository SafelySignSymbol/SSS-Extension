import React, { Dispatch, useState } from 'react'
import styled from '@emotion/styled'
import { encrypt } from '../../../_general/lib/Crypto'

import { IconButton, MobileStepper, Modal, Paper } from '@mui/material'

import { IoMdClose } from 'react-icons/io'

import { Address, Account, NetworkType } from 'symbol-sdk'
import {
  addExtensionAccount,
  changeNetwork,
  getExtensionAccounts,
} from '../../../_general/lib/Storage'
import { ExtensionAccount } from '../../../_general/model/ExtensionAccount'
import { useTranslation } from 'react-i18next'
import Typography from '../../../_general/components/Typography'
import Color, { addAlpha } from '../../../_general/utils/Color'
import { IconContext } from 'react-icons'
import MethodSelect from './MethodSelect'
import ImportPriKey from './ImportPriKey'
import CreateAccount from './CreateAccount'

import { MdArrowRight, MdArrowLeft } from 'react-icons/md'
import { getNetworkTypeByAddress } from '../../../_general/lib/Symbol/Config'
import CheckAccount from './CheckAccount'
import Hardware from './Hardware'
import Mnemonic from './Mnemonic'
import {
  Snackbar,
  SnackbarProps,
  SnackbarType,
} from '../../../_general/components/Snackbar'

export type Props = {
  state: number
  setState: Dispatch<number>
  reload: () => void
}

export type Method = 'IMPORT' | 'CREATE' | 'HARDWARE' | 'MNEMONIC' | 'NONE'

const Component: React.VFC<Props> = ({ state, setState, reload }) => {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [prikey, setPrikey] = useState('')
  const [pubKey, setPubkey] = useState('')
  const [pass, setPass] = useState('')

  const [method, setMethod] = useState<Method>('NONE')
  const [nettype, setNettype] = useState<NetworkType>(NetworkType.TEST_NET)

  const [snackbar, setSnackbar] = useState<SnackbarProps>({} as SnackbarProps)

  const [t] = useTranslation()

  const closeModal = () => {
    setState(0)
  }

  const resetInput = () => {
    setName('')
    setAddress('')
    setPrikey('')
    setPass('')
  }

  const submitHardware = () => {
    const extensionAccount = new ExtensionAccount(
      name,
      prikey,
      pubKey,
      address,
      'HARD'
    )

    getExtensionAccounts().then((accs) => {
      addExtensionAccount(extensionAccount)
        .then(() => {
          if (accs.length === 0) {
            const net = extensionAccount.getNetworktype()
            changeNetwork(net).then(() => {
              reload()
            })
          }
          setSnackbar({
            isOpen: true,
            snackbarMessage: t('accmodal_success_register'),
            snackbarStatus: SnackbarType.SUCCESS,
          })
          resetInput()
          closeModal()
          reload()
        })
        .catch(() => {
          setSnackbar({
            isOpen: true,
            snackbarMessage: t('accmodal_allready_added'),
            snackbarStatus: SnackbarType.ERROR,
          })
        })
        .finally(() => {})
    })
  }

  const submit = () => {
    if (address === '') {
      setSnackbar({
        isOpen: true,
        snackbarMessage: t('accmodal_wrong_address_format'),
        snackbarStatus: SnackbarType.ERROR,
      })
    }

    if (method === 'HARDWARE') {
      return submitHardware()
    }

    if (prikey === '') {
      setSnackbar({
        isOpen: true,
        snackbarMessage: t('accmodal_wrong_prikey_format'),
        snackbarStatus: SnackbarType.ERROR,
      })
    }

    const addr = Address.createFromRawAddress(address)
    const net = getNetworkTypeByAddress(addr.plain())
    const acc = Account.createFromPrivateKey(prikey, net)
    if (addr.plain() !== acc.address.plain()) {
      setSnackbar({
        isOpen: true,
        snackbarMessage: t('accmodal_wrong_keypair'),
        snackbarStatus: SnackbarType.ERROR,
      })
    } else {
      const enpk = encrypt(prikey, pass)

      const extensionAccount = new ExtensionAccount(
        name,
        enpk,
        acc.publicKey,
        acc.address.plain(),
        'PASS'
      )

      getExtensionAccounts().then((accs) => {
        addExtensionAccount(extensionAccount)
          .then(() => {
            if (accs.length === 0) {
              changeNetwork(net).then(() => {
                reload()
              })
            }

            setSnackbar({
              isOpen: true,
              snackbarMessage: t('accmodal_success_register'),
              snackbarStatus: SnackbarType.SUCCESS,
            })

            resetInput()
            closeModal()
            reload()
          })
          .catch(() => {
            setSnackbar({
              isOpen: true,
              snackbarMessage: t('accmodal_allready_added'),
              snackbarStatus: SnackbarType.ERROR,
            })
          })
          .finally(() => {})
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
            setNet={setNettype}
            setAddress={setAddress}
            setPrikey={setPrikey}
            net={nettype}
            address={address}
          />
        )
      }

      if (method === 'HARDWARE') {
        return (
          <Hardware
            setName={setName}
            setNet={setNettype}
            setAddress={setAddress}
            setPublicKey={setPubkey}
            setPrivateKey={setPrikey}
            address={address}
            network={nettype}
          />
        )
      }
      if (method === 'MNEMONIC') {
        return (
          <Mnemonic
            setName={setName}
            setAddress={setAddress}
            setPrivateKey={setPrikey}
            setPassword={setPass}
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
                <Typography
                  fontSize={32}
                  text="Back"
                  color={Color.base_white}
                />
              </IconContext.Provider>
            </BackButton>
            <NextButton onClick={nextImport}>
              <Typography fontSize={32} text="Next" color={Color.base_white} />
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
                <Typography
                  fontSize={32}
                  text="Back"
                  color={Color.base_white}
                />
              </IconContext.Provider>
            </BackButton>
            <NextButton onClick={nextCreate}>
              <Typography fontSize={32} text="Next" color={Color.base_white} />
              <IconContext.Provider value={{ size: '64px' }}>
                <MdArrowRight
                  style={{ color: Color.base_white, margin: '0px 16px' }}
                />
              </IconContext.Provider>
            </NextButton>
          </ButtonWrappr>
        )
      }
      if (method === 'MNEMONIC') {
        return (
          <ButtonWrappr>
            <BackButton onClick={() => setState(state - 1)}>
              <IconContext.Provider value={{ size: '64px' }}>
                <MdArrowLeft
                  style={{ color: Color.base_white, margin: '0px 16px' }}
                />
                <Typography
                  fontSize={32}
                  text="Back"
                  color={Color.base_white}
                />
              </IconContext.Provider>
            </BackButton>
            <NextButton onClick={nextCreate}>
              <Typography fontSize={32} text="Next" color={Color.base_white} />
              <IconContext.Provider value={{ size: '64px' }}>
                <MdArrowRight
                  style={{ color: Color.base_white, margin: '0px 16px' }}
                />
              </IconContext.Provider>
            </NextButton>
          </ButtonWrappr>
        )
      }
      if (method === 'HARDWARE') {
        return (
          <ButtonWrappr>
            <BackButton onClick={() => setState(state - 1)}>
              <IconContext.Provider value={{ size: '64px' }}>
                <MdArrowLeft
                  style={{ color: Color.base_white, margin: '0px 16px' }}
                />
                <Typography
                  fontSize={32}
                  text="Back"
                  color={Color.base_white}
                />
              </IconContext.Provider>
            </BackButton>
            <NextButton onClick={nextCreate}>
              <Typography fontSize={32} text="Next" color={Color.base_white} />
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
              <Typography fontSize={32} text="Back" color={Color.base_white} />
            </IconContext.Provider>
          </BackButton>
          <NextButton onClick={submit}>
            <Typography fontSize={32} text="Done" color={Color.base_white} />
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
      setSnackbar({
        isOpen: true,
        snackbarMessage: t('accmodal_wrong_address_format'),
        snackbarStatus: SnackbarType.ERROR,
      })

      return
    }

    if (!prikey) {
      setSnackbar({
        isOpen: true,
        snackbarMessage: t('accmodal_wrong_prikey_format'),
        snackbarStatus: SnackbarType.ERROR,
      })
      return
    }

    const nt = getNetworkTypeByAddress(address)
    const addr = Address.createFromRawAddress(address)
    const acc = Account.createFromPrivateKey(prikey, nt)

    if (addr.plain() !== acc.address.plain()) {
      setSnackbar({
        isOpen: true,
        snackbarMessage: t('accmodal_wrong_keypair'),
        snackbarStatus: SnackbarType.ERROR,
      })
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
            <Typography fontSize={28} text={t('accmodal_signup')} />
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
      <Snackbar
        isOpen={snackbar.isOpen}
        snackbarMessage={snackbar.snackbarMessage}
        snackbarStatus={snackbar.snackbarStatus}
      />
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
  padding: '24px 32px',
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
