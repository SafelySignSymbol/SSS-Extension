import React, { useState } from 'react'

import styled from '@emotion/styled'
import Typography from '../../../_general/components/Typography'
import { ExtensionAccount } from '../../../_general/model/ExtensionAccount'
import {
  Alert,
  AlertColor,
  IconButton,
  Modal,
  Paper,
  Snackbar,
} from '@mui/material'
import { IconContext } from 'react-icons'
import { HiOutlineClipboardCopy } from 'react-icons/hi'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { Setting } from '../../../_general/lib/Storage'
import { Account, NetworkType } from 'symbol-sdk'
import { getNetworkTypeByAddress } from '../../../_general/lib/Symbol/Config'
import Button from '../../../_general/components/Button'
import { decriptPrivateKey } from '../../../_general/lib/Crypto/core'
import PasswordTextField from '../../../_general/components/TextField/PasswordTextField'
import { t } from 'i18next'
import { IoMdClose } from 'react-icons/io'
import Color, {
  MainNetColors,
  TestNetColors,
} from '../../../_general/utils/Color'
import Avatar from 'boring-avatars'

export type Props = {
  activeAccount: ExtensionAccount
  setting: Setting
  reload: () => void
}

const asterisk =
  '****************************************************************'

const Component: React.VFC<Props> = ({ activeAccount }) => {
  const [open, setOpen] = useState(false)
  const [pass, setPass] = useState('')
  const [prikey, setPrikey] = useState(asterisk)

  const [message, setMessage] = useState('')
  const [openSB, setOpenSB] = useState(false)
  const [snackbarStatus, setSnackbarStatus] = useState<AlertColor>('success')

  const copy = (value: string) => {
    navigator.clipboard.writeText(value)
  }

  const showPrikey = () => {
    try {
      const pk = decriptPrivateKey(activeAccount.encriptedPrivateKey, pass)
      const acc = Account.createFromPrivateKey(
        pk,
        getNetworkTypeByAddress(activeAccount.address)
      )

      if (open && acc.address.plain() === activeAccount.address) {
        setPrikey(pk)
        setSnackbarStatus('success')
        setMessage('秘密鍵を表示します')
        setOpenSB(true)
      } else {
        setSnackbarStatus('error')
        setMessage('復号に失敗しました')
        setOpenSB(true)
      }
    } catch {
      setSnackbarStatus('error')
      setMessage('復号に失敗しました')
      setOpenSB(true)
    }
    setPass('')
    setOpen(false)
  }

  return (
    <Root>
      <Wrapper>
        <Name>
          <AvatarWrapper>
            <Avatar
              size={40}
              name={activeAccount.address}
              variant="beam"
              colors={
                getNetworkTypeByAddress(activeAccount.address) ===
                NetworkType.MAIN_NET
                  ? MainNetColors
                  : TestNetColors
              }
            />
          </AvatarWrapper>
          <Typography text={activeAccount.name} fontSize={32} />
        </Name>
        <Flex isLast={false}>
          <VerticalMargin>
            <Typography text="Address" fontSize={24} />
            <Typography text={activeAccount.address} fontSize={20} />
          </VerticalMargin>
          <IconButton size="small" onClick={() => copy(activeAccount.address)}>
            <IconContext.Provider value={{ size: '24px' }}>
              <HiOutlineClipboardCopy style={{ margin: '6px' }} />
            </IconContext.Provider>
          </IconButton>
        </Flex>
        <Flex isLast={activeAccount.type === 'HARD'}>
          <VerticalMargin>
            <Typography text="PublicKey" fontSize={24} />
            <Typography text={activeAccount.publicKey} fontSize={20} />
          </VerticalMargin>
          <IconButton
            size="small"
            onClick={() => copy(activeAccount.publicKey)}>
            <IconContext.Provider value={{ size: '24px' }}>
              <HiOutlineClipboardCopy style={{ margin: '6px' }} />
            </IconContext.Provider>
          </IconButton>
        </Flex>
        {activeAccount.type !== 'HARD' && (
          <Flex isLast={true}>
            <VerticalMargin>
              <Typography text="PrivateKey" fontSize={24} />
              <Typography text={prikey} fontSize={20} />
            </VerticalMargin>
            {prikey === asterisk ? (
              <IconButton size="small" onClick={() => setOpen(true)}>
                <IconContext.Provider value={{ size: '24px' }}>
                  <MdVisibility style={{ margin: '6px' }} />
                </IconContext.Provider>
              </IconButton>
            ) : (
              <IconButton size="small" onClick={() => setPrikey(asterisk)}>
                <IconContext.Provider value={{ size: '24px' }}>
                  <MdVisibilityOff style={{ margin: '6px' }} />
                </IconContext.Provider>
              </IconButton>
            )}
          </Flex>
        )}
      </Wrapper>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalWrapper>
          <ModalHeader>
            <Typography fontSize={20} text={t('enter_password')} />
            <IconButton size="small" onClick={() => setOpen(false)}>
              <IconContext.Provider value={{ size: '24px' }}>
                <IoMdClose style={{ margin: '6px' }} />
              </IconContext.Provider>
            </IconButton>
          </ModalHeader>
          <Contents>
            <TFWrapper>
              <PasswordTextField label="Password" setPass={setPass} />
            </TFWrapper>
            <Right>
              <Button text="Check" onClick={showPrikey} />
            </Right>
          </Contents>
        </ModalWrapper>
      </Modal>
      <Snackbar
        open={openSB}
        autoHideDuration={6000}
        onClose={() => setOpenSB(false)}>
        <Alert
          onClose={() => setOpenSB(false)}
          severity={snackbarStatus}
          sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Root>
  )
}

export default Component

const Wrapper = styled('div')({
  background: Color.pure_white,
  padding: '40px',
  margin: '16px 8px',
})

const Root = styled('div')({
  margin: '32px 0px 0px',
  minWidth: '60vw',
  width: '800px',
})

const Flex = styled('div')((p: { isLast: boolean }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: p.isLast ? '0px' : '12px',
}))

const Name = styled('div')({
  marginBottom: '16px',
  height: '50px',
  display: 'flex',
  alignItems: 'center',
})

const ModalWrapper = styled(Paper)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '600px',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
})
const Right = styled('div')({
  display: 'flex',
  justifyContent: 'end',
  marginTop: '16px',
})
const ModalHeader = styled('div')({
  background: Color.base_white,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px',
})

const Contents = styled('div')({
  margin: '32px',
})

const TFWrapper = styled('div')({
  width: '100%',
  '& > div': {
    width: '100%',
  },
})

const AvatarWrapper = styled('div')({
  marginRight: '16px',
})

const VerticalMargin = styled('div')({
  ':nth-child(1)': {
    marginBottom: '4px',
  },
})
