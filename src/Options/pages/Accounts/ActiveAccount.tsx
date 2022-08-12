import React, { useState } from 'react'

import styled from '@emotion/styled'

import Typography from '../../../_general/components/Typography'

import Color from '../../../_general/utils/Color'

import { ExtensionAccount } from '../../../_general/model/ExtensionAccount'
import {
  Alert,
  AlertColor,
  Chip,
  IconButton,
  Modal,
  Paper,
  Snackbar,
} from '@mui/material'
import { IconContext } from 'react-icons'
import { HiOutlineClipboardCopy } from 'react-icons/hi'
import { MdVisibility } from 'react-icons/md'
import { Setting } from '../../../_general/lib/Storage'
import { Account, NetworkType } from 'symbol-sdk'
import { getNetworkTypeByAddress } from '../../../_general/lib/Symbol/Config'
import TextField from '../../../_general/components/TextField'
import Button from '../../../_general/components/Button'
import { decriptPrivateKey } from '../../../_general/lib/Crypto/core'
import PasswordTextField from '../../../_general/components/TextField/PasswordTextField'

export type Props = {
  activeAccount: ExtensionAccount
  setting: Setting
  reload: () => void
}

const Component: React.VFC<Props> = ({ activeAccount, reload, setting }) => {
  const [open, setOpen] = useState(false)
  const [pass, setPass] = useState('')
  const [prikey, setPrikey] = useState('**********')

  const [message, setMessage] = useState('')
  const [openSB, setOpenSB] = useState(false)
  const [snackbarStatus, setSnackbarStatus] = useState<AlertColor>('success')

  const copy = (value: string) => {
    navigator.clipboard.writeText(value)
  }

  const net_type = getNetworkTypeByAddress(activeAccount.address)

  const color: string = (() => {
    if (net_type === NetworkType.TEST_NET) {
      return 'black'
    } else {
      return Color.sky
    }
  })()

  const showPrikey = () => {
    try {
      const pk = decriptPrivateKey(
        Array.from(String(activeAccount.seed)),
        activeAccount.encriptedPrivateKey,
        pass
      )
      const acc = Account.createFromPrivateKey(
        pk,
        getNetworkTypeByAddress(activeAccount.address)
      )

      if (!open && acc.address.plain() === activeAccount.address) {
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
          <Typography text={activeAccount.name} variant="h5" />
          <div>
            <SChip
              label={
                net_type === NetworkType.TEST_NET ? 'TEST NET' : 'MAIN NET'
              }
              clr={color}
            />
          </div>
        </Name>
        <Flex>
          <div>
            <Typography text="Address" variant="h5" />
            <Typography text={activeAccount.address} variant="h6" />
          </div>
          <IconButton size="small" onClick={() => copy(activeAccount.address)}>
            <IconContext.Provider value={{ size: '24px' }}>
              <HiOutlineClipboardCopy style={{ margin: '6px' }} />
            </IconContext.Provider>
          </IconButton>
        </Flex>
        <Flex>
          <div>
            <Typography text="PublicKey" variant="h5" />
            <Typography text={activeAccount.publicKey} variant="h6" />
          </div>
          <IconButton
            size="small"
            onClick={() => copy(activeAccount.publicKey)}>
            <IconContext.Provider value={{ size: '24px' }}>
              <HiOutlineClipboardCopy style={{ margin: '6px' }} />
            </IconContext.Provider>
          </IconButton>
        </Flex>
        <Flex>
          <div>
            <Typography text="PrivateKey" variant="h5" />
            <Typography text={prikey} variant="h6" />
          </div>
          <IconButton size="small" onClick={() => setOpen(true)}>
            <IconContext.Provider value={{ size: '24px' }}>
              <MdVisibility style={{ margin: '6px' }} />
            </IconContext.Provider>
          </IconButton>
        </Flex>
      </Wrapper>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalWrapper>
          <PasswordTextField label="Password" setPass={setPass} />
          <Right>
            <Button text="Check" onClick={showPrikey} />
          </Right>
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
  background: 'white',
  padding: '16px',
  margin: '8px',
})

const Root = styled('div')({
  margin: '64px 10vw 0px',
  minWidth: '60vw',
  width: '800px',
})

const Flex = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: '8px',
})

const Name = styled('div')({
  marginBottom: '8px',
  display: 'flex',
  justifyContent: 'space-between',
})

const SChip = styled(Chip)((p: { clr: string }) => ({
  margin: '0px 16px',
  color: p.clr,
}))

const ModalWrapper = styled(Paper)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '600px',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '32px',
})
const Right = styled('div')({
  display: 'flex',
  justifyContent: 'end',
})
