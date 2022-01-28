import React, { RefObject, useEffect, useState } from 'react'
import styled from '@emotion/styled'

import { Account, Address, NetworkType } from 'symbol-sdk'
import CryptoJS from 'crypto-js'

import { Alert, AlertColor, Snackbar } from '@mui/material'

import Spacer from '../_general/components/Spacer'
import TextField from '../_general/components/TextField'
import Button from '../_general/components/Button'
import {
  validateAddress,
  validatePrivateKey,
  validateRef,
} from '../_general/lib/validator'
import { getActiveAccount, setActiveAccount } from '../_general/lib/Storage'

export interface Props {
  addressRef: RefObject<HTMLInputElement>
  priKeyRef: RefObject<HTMLInputElement>
  passRef: RefObject<HTMLInputElement>
}

const Options: React.VFC<Props> = ({ addressRef, priKeyRef, passRef }) => {
  const [opensb, setOpensb] = useState(false)
  const [statussb, setStatussb] = useState<AlertColor>('success')
  const [msgsb, setMsgsb] = useState('')

  // useEffect(() => {
  //   ;(async () => {
  //     const acc = await getActiveAccount()
  //     console.log('active account:', acc)
  //   })()
  // })

  const resetInput = () => {
    if (!(addressRef === null || addressRef.current === null))
      addressRef.current.value = ''
    if (!(priKeyRef === null || priKeyRef.current === null))
      priKeyRef.current.value = ''
    if (!(passRef === null || passRef.current === null))
      passRef.current.value = ''
  }
  const handleClick = () => {
    const ad = validateRef(addressRef, validateAddress)
    const pk = validateRef(priKeyRef, validatePrivateKey)
    const ps = validateRef(passRef)

    if (!ad) {
      setStatussb('error')
      setMsgsb('アドレスのフォーマットが間違っています。')
      resetInput()
    }
    if (!pk) {
      setStatussb('error')
      setMsgsb('秘密鍵のフォーマットが間違っています。')
      resetInput()
    }

    const addr = Address.createFromRawAddress(ad)
    const acc = Account.createFromPrivateKey(
      pk,
      ad.charAt(0) === 'T' ? NetworkType.TEST_NET : NetworkType.MAIN_NET
    )

    if (addr.plain() !== acc.address.plain()) {
      console.log('not mutch')
      setOpensb(true)
      setStatussb('error')
      setMsgsb('秘密鍵とアドレスのペアが一致しません。')
      resetInput()
    } else {
      const enpk = CryptoJS.AES.encrypt(pk, ps).toString()
      setOpensb(true)
      setStatussb('success')
      setMsgsb('暗号化秘密鍵を保存しました。')
      chrome.runtime.sendMessage({
        type: 'SET_ACCOUNT',
        pk: enpk,
        addr: acc.address.plain(),
        pubKey: acc.publicKey,
      })
      resetInput()
    }
  }

  const closesb = () => {
    setOpensb(false)
    setStatussb('success')
  }
  return (
    <Root>
      <Spacer margin="8px">
        <TextField text="Address" inputRef={addressRef} />
      </Spacer>
      <Spacer margin="8px">
        <TextField text="Private Key" inputRef={priKeyRef} />
      </Spacer>
      <Spacer margin="8px">
        <TextField text="Password" inputRef={passRef} />
      </Spacer>
      <Spacer margin="8px">
        <Button text="SUBMIT" onClick={handleClick} />
      </Spacer>
      <Spacer margin="8px">
        <Button
          text="CHANGE"
          onClick={() => {
            setActiveAccount(1)
          }}
        />
      </Spacer>
      <Snackbar open={opensb} autoHideDuration={6000} onClose={closesb}>
        <Alert onClose={closesb} severity={statussb} sx={{ width: '100%' }}>
          {msgsb}
        </Alert>
      </Snackbar>
    </Root>
  )
}

export default Options

const Root = styled('div')({})
