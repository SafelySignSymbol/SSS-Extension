import React, { useState } from 'react'

import styled from '@emotion/styled'
import Typography from '../../../_general/components/Typography'
import { ExtensionAccount } from '../../../_general/model/ExtensionAccount'
import { Alert, AlertColor, IconButton, Modal, Paper } from '@mui/material'
import { IconContext } from 'react-icons'
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
import { Snackbar, SnackbarProps } from '../../../_general/components/Snackbar'

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

  const [snackbar, setSnackbar] = useState<SnackbarProps>({} as SnackbarProps)

  const copyAddress = (value: string) => {
    navigator.clipboard.writeText(value)
    setSnackbar({
      isOpen: true,
      snackbarMessage: t('copied_address').replace(
        '{{address}}',
        activeAccount.address
      ),
      snackbarStatus: 'success',
    })
  }
  const copyPubkey = (value: string) => {
    navigator.clipboard.writeText(value)

    setSnackbar({
      isOpen: true,
      snackbarMessage: t('copied_pubkey').replace(
        '{{pubkey}}',
        activeAccount.publicKey
      ),
      snackbarStatus: 'success',
    })
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
        setSnackbar({
          isOpen: true,
          snackbarMessage: t('show_prikey'),
          snackbarStatus: 'success',
        })
      } else {
        setSnackbar({
          isOpen: true,
          snackbarMessage: t('failed_decryption'),
          snackbarStatus: 'error',
        })
      }
    } catch {
      setSnackbar({
        isOpen: true,
        snackbarMessage: t('failed_decryption'),
        snackbarStatus: 'error',
      })
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
          <Typography
            text={activeAccount.name || activeAccount.address}
            fontSize={32}
          />
        </Name>
        <Flex isLast={false}>
          <VerticalMargin onClick={() => copyAddress(activeAccount.address)}>
            <Typography text="Address" fontSize={24} />
            <Typography
              text={activeAccount.address}
              fontSize={20}
              color={Color.gray_black}
            />
          </VerticalMargin>
        </Flex>
        <Flex isLast={activeAccount.type === 'HARD'}>
          <VerticalMargin onClick={() => copyPubkey(activeAccount.publicKey)}>
            <Typography text="PublicKey" fontSize={24} />
            <Typography
              text={activeAccount.publicKey}
              fontSize={20}
              color={Color.gray_black}
            />
          </VerticalMargin>
        </Flex>
        {activeAccount.type !== 'HARD' && (
          <Flex isLast={true}>
            <VerticalMarginPK>
              <Typography text="PrivateKey" fontSize={24} />
              <Typography
                text={prikey}
                fontSize={20}
                color={Color.gray_black}
              />
            </VerticalMarginPK>
            {prikey === asterisk ? (
              <IconButton
                size="small"
                onClick={() => setOpen(true)}
                sx={{ height: '100%' }}>
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
        isOpen={snackbar.isOpen}
        snackbarMessage={snackbar.snackbarMessage}
        snackbarStatus={snackbar.snackbarStatus}
      />
    </Root>
  )
}

export default Component

const Wrapper = styled('div')({
  background: Color.pure_white,
  padding: '40px',
  margin: '16px 8px',
  borderBottom: `solid 1px ${Color.grayscale}`,
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
  marginBottom: p.isLast ? '0px' : '4px',
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
  cursor: 'pointer',
  padding: '8px 16px',
  width: '100%',
  '> :nth-child(1)': {
    marginBottom: '8px',
  },
  ':hover': {
    background: Color.base_white,
  },
})
const VerticalMarginPK = styled('div')({
  padding: '4px 16px',
  '> :nth-child(1)': {
    marginBottom: '8px',
  },
})
