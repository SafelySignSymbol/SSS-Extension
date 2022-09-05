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
  getActiveAccountV2,
  getCosignatories,
  getSetting,
  getSignStatus,
  Setting,
} from '../_general/lib/Storage'

import { ExtensionAccount } from '../_general/model/ExtensionAccount'

import Login from './pages/Login'
import Main from './pages/Main'

import {
  encription,
  signCosignatureTransaction,
  sign,
  signWithCosignatories,
} from '../_general/lib/Sign'
import {
  REMOVE_DATA,
  REQUEST_ACTIVE_ACCOUNT_TOKEN,
  REQUEST_SIGN,
  REQUEST_SIGN_COSIGNATURE,
  REQUEST_SIGN_WITH_COSIGNATORIES,
} from '../_general/model/MessageType'

const LOGIN = 'LOGIN'
const MAIN = 'MAIN'

type PopupStatus = 'LOGIN' | 'MAIN'

const Popup: React.VFC = () => {
  const [extensionAccount, setExtensionAccount] =
    useState<ExtensionAccount | null>(null)
  const [status, setStatus] = useState<PopupStatus>(LOGIN)
  const [signStatus, setSignStatus] = useState<string>('')
  const [update, setUpdate] = useState(new Date())
  const [pageSetting, setPageSetting] = useState<Setting>({} as Setting)

  window.onbeforeunload = () => {
    chrome.runtime.sendMessage({
      type: REMOVE_DATA,
    })
  }

  const [pass, setPass] = useState('')
  useEffect(() => {
    getSetting().then((s) => {
      setPageSetting(s)
      getActiveAccountV2(s.networkType)
        .then((acc) => {
          const account = ExtensionAccount.createExtensionAccount(acc)
          setExtensionAccount(account)
        })
        .catch(() => {
          chrome.runtime.openOptionsPage()
        })
    })

    getSignStatus().then((status) => {
      setSignStatus(status)
    })
  }, [update])

  const loginSuccess = (p: string) => {
    setPass(p)
    setStatus('MAIN')
  }

  const encriptMessage = (message: string, pubkey: string) => {
    if (extensionAccount === null) {
      return
    }

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
      encription(JSON.stringify(msg), pubkey, extensionAccount, pass)
    } else {
      encription(message, pubkey, extensionAccount, pass)
    }
  }

  const signTx = (transaction: Transaction | AggregateTransaction | null) => {
    if (extensionAccount === null || transaction === null) {
      return
    }
    const net_type = extensionAccount.getNetworktype()

    if (signStatus === REQUEST_SIGN) {
      sign(transaction, extensionAccount, pass)
    }
    if (signStatus === REQUEST_SIGN_COSIGNATURE) {
      signCosignatureTransaction(
        transaction.serialize(),
        extensionAccount,
        pass
      )
    }
    if (signStatus === REQUEST_SIGN_WITH_COSIGNATORIES) {
      getCosignatories().then((accounts) => {
        const accs = accounts.map((acc) =>
          Account.createFromPrivateKey(acc, net_type)
        )
        signWithCosignatories(
          transaction as AggregateTransaction,
          accs,
          extensionAccount,
          pass
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
          logout={() => {
            setStatus(LOGIN)
            setUpdate(new Date())
          }}
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
