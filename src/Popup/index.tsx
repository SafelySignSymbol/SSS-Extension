import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'

import './global.css'
import {
  Account,
  AggregateTransaction,
  PublicAccount,
  Transaction,
  EncryptedMessage,
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
import {
  REMOVE_DATA,
  REQUEST_ACTIVE_ACCOUNT_TOKEN,
  REQUEST_SIGN,
  REQUEST_SIGN_COSIGNATURE,
  REQUEST_SIGN_WITH_COSIGNATORIES,
} from '../_general/model/MessageType'
import { getNetworkTypeByAddress } from '../_general/lib/Symbol/Config'

const LOGIN = 'LOGIN'
const MAIN = 'MAIN'

type PopupStatus = 'LOGIN' | 'MAIN'

const Popup: React.VFC = () => {
  const [extensionAccount, setExtensionAccount] =
    useState<ExtensionAccount | null>(null)
  const [status, setStatus] = useState<PopupStatus>(LOGIN)
  const [signStatus, setSignStatus] = useState<string>('')

  window.onbeforeunload = () => {
    chrome.runtime.sendMessage({
      type: REMOVE_DATA,
    })
  }

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
    // const priKey = decrypt(
    //   extensionAccount.encriptedPrivateKey,
    //   pass,
    //   extensionAccount.seed
    // )

    const priKey = extensionAccount.decrypt(pass)

    const net_type = extensionAccount.getNetworktype()

    if (signStatus === REQUEST_ACTIVE_ACCOUNT_TOKEN) {
      const msg = JSON.parse(message)
      const acc = Account.createFromPrivateKey(priKey, net_type)
      const recipient = PublicAccount.createFromPublicKey(pubkey, net_type)

      const encryptedMessage = !!msg.encryptedMessage
        ? acc.decryptMessage(
            new EncryptedMessage(msg.encryptedMessage),
            recipient
          ).payload
        : undefined
      msg.encryptedMessage = encryptedMessage
      encription(JSON.stringify(msg), pubkey, priKey, net_type)
    } else {
      encription(message, pubkey, priKey, net_type)
    }
  }

  const signTx = (transaction: Transaction | AggregateTransaction | null) => {
    if (extensionAccount === null || transaction === null) {
      return
    }
    // const priKey = decrypt(
    //   extensionAccount.encriptedPrivateKey,
    //   pass,
    //   extensionAccount.seed
    // )
    const priKey = extensionAccount.decrypt(pass)

    const net_type = extensionAccount.getNetworktype()

    if (signStatus === REQUEST_SIGN) {
      sign(transaction, priKey, net_type)
    }
    if (signStatus === REQUEST_SIGN_COSIGNATURE) {
      signCosignatureTransaction(transaction.serialize(), priKey, net_type)
    }
    if (signStatus === REQUEST_SIGN_WITH_COSIGNATORIES) {
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

    if (status === LOGIN) {
      return (
        <Login
          extensionAccount={extensionAccount}
          loginSuccess={loginSuccess}
        />
      )
    }

    if (status === MAIN) {
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
