import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import CryptoJS from 'crypto-js'

import './global.css'

import { getActiveAccount, removeTransaction } from '../_general/lib/Storage'
import { ExtensionAccount } from '../_general/model/ExtensionAccount'
import Login from './pages/Login'
import Main from './pages/Main'
import { Account, NetworkType, Transaction } from 'symbol-sdk'

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

  const sign = (transaction: Transaction | null) => {
    console.log('pass', pass)
    if (extensionAccount === null || transaction === null) {
      return
    }
    const priKey = CryptoJS.AES.decrypt(
      extensionAccount.encriptedPrivateKey,
      pass
    ).toString(CryptoJS.enc.Utf8)

    const net_type =
      extensionAccount.address.charAt(0) === 'T'
        ? NetworkType.TEST_NET
        : NetworkType.MAIN_NET

    const acc = Account.createFromPrivateKey(priKey, net_type)

    const generationHash =
      extensionAccount.address.charAt(0) === 'T'
        ? '7FCCD304802016BEBBCD342A332F91FF1F3BB5E902988B352697BE245F48E836'
        : '57F7DA205008026C776CB6AED843393F04CD458E0AA2D9F1D5F31A402072B2D6'

    const signedTx = acc.sign(transaction, generationHash)
    removeTransaction()
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs[0].id) {
        console.error('not found tabs')
        return
      }
      chrome.tabs.sendMessage(tabs[0].id, {
        type: 'SIGNED_TRANSACTION',
        signedTx: signedTx,
      })
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
      return <Main extensionAccount={extensionAccount} sign={sign} />
    }
  }
  return <Root>{getBody()}</Root>
}

export default Popup

const Root = styled('div')({
  width: '800px',
  height: '600px',
})
