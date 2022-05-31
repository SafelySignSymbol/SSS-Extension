import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { decrypt } from '../_general/lib/Crypto'

import './global.css'
import {
  Account,
  AggregateTransaction,
  NetworkType,
  Transaction,
} from 'symbol-sdk'

import {
  getActiveAccount,
  getCosignatories,
  getSignStatus,
} from '../_general/lib/Storage'
import { ExtensionAccount } from '../_general/model/ExtensionAccount'
import Login from './pages/Login'
import Main from './pages/Main'
import {
  encription,
  sign,
  signCosignatureTransaction,
  signWithCosignatories,
} from '../_general/lib/Sign'
import { REQUEST_SIGN } from '../_general/model/MessageType'

type PopupStatus = 'LOGIN' | 'MAIN'

const Popup: React.VFC = () => {
  const [extensionAccount, setExtensionAccount] =
    useState<ExtensionAccount | null>(null)
  const [status, setStatus] = useState<PopupStatus>('LOGIN')
  const [signStatus, setSignStatus] = useState<string>('')

  const [pass, setPass] = useState('')
  useEffect(() => {
    getActiveAccount().then((acc) => {
      if (acc === null) {
        chrome.runtime.openOptionsPage()
      } else {
        setExtensionAccount(acc)
      }
    })

    getSignStatus().then((status) => {
      setSignStatus(status)
    })
  }, [])

  const loginSuccess = (p: string) => {
    setPass(p)
    setStatus('MAIN')
  }

  const encriptMessage = (message: string, pubkey: string) => {
    if (extensionAccount === null) {
      return
    }
    const priKey = decrypt(
      extensionAccount.encriptedPrivateKey,
      pass,
      extensionAccount.seed
    )

    const net_type =
      extensionAccount.address.charAt(0) === 'T'
        ? NetworkType.TEST_NET
        : NetworkType.MAIN_NET

    encription(message, pubkey, priKey, net_type)
  }

  const signTx = (transaction: Transaction | AggregateTransaction | null) => {
    if (extensionAccount === null || transaction === null) {
      return
    }
    const priKey = decrypt(
      extensionAccount.encriptedPrivateKey,
      pass,
      extensionAccount.seed
    )

    const net_type =
      extensionAccount.address.charAt(0) === 'T'
        ? NetworkType.TEST_NET
        : NetworkType.MAIN_NET

    if (signStatus === REQUEST_SIGN) {
      sign(transaction, priKey, net_type)
    }
    if (signStatus === 'requestSignCosignatureTransaction') {
      signCosignatureTransaction(transaction.serialize(), priKey, net_type)
    }
    if (signStatus === 'requestSignWithCosignatories') {
      getCosignatories().then((accounts) => {
        const accs = accounts.map((acc) =>
          Account.createFromPrivateKey(acc, net_type)
        )
        signWithCosignatories(
          transaction as AggregateTransaction,
          accs,
          priKey,
          net_type
        )
      })
    }
  }

  const getBody = () => {
    if (extensionAccount === null) {
      return
    }
    if (status === 'LOGIN') {
      return (
        <Login
          extensionAccount={extensionAccount}
          loginSuccess={loginSuccess}
        />
      )
    }

    if (status === 'MAIN') {
      return (
        <Main
          extensionAccount={extensionAccount}
          signTx={signTx}
          encriptMessage={encriptMessage}
          type={signStatus}
        />
      )
    }
  }
  return <Root>{getBody()}</Root>
}

export default Popup

const Root = styled('div')({
  width: '800px',
  height: '600px',
})
