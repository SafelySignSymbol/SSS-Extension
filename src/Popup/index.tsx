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
  sign,
  signCosignatureTransaction,
  signWithCosignatories,
} from '../_general/lib/Sign'

type PopupStatus = 'LOGIN' | 'MAIN'

const Popup: React.VFC = () => {
  const [extensionAccount, setExtensionAccount] =
    useState<ExtensionAccount | null>(null)
  const [status, setStatus] = useState<PopupStatus>('LOGIN')

  const [pass, setPass] = useState('')
  useEffect(() => {
    getActiveAccount().then((acc) => {
      if (acc === null) {
        chrome.runtime.openOptionsPage()
      } else {
        setExtensionAccount(acc)
      }
    })
  }, [])

  const loginSuccess = (p: string) => {
    setPass(p)
    setStatus('MAIN')
  }

  const signTx = (
    transaction: Transaction | AggregateTransaction | null,
    hash = ''
  ) => {
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

    getSignStatus().then((status) => {
      if (status === 'requestSign') {
        sign(transaction, priKey, net_type)
      }
      if (status === 'requestSignCosignatureTransaction') {
        signCosignatureTransaction(transaction.serialize(), priKey, net_type)
      }
      if (status === 'requestSignWithCosignatories') {
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
    })
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
      return <Main extensionAccount={extensionAccount} sign={signTx} />
    }
  }
  return <Root>{getBody()}</Root>
}

export default Popup

const Root = styled('div')({
  width: '800px',
  height: '600px',
})
