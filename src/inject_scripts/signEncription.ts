import {
  REMOVE_DATA,
  REQUEST_MESSAGE_ENCODE,
} from './../_general/model/MessageType'
import { EncryptedMessage, PublicAccount } from 'symbol-sdk'
import {
  REQUEST_ACTIVE_ACCOUNT_TOKEN,
  SET_MESSAGE,
} from '../_general/model/MessageType'
import { showSnackbar } from './snackbar'

interface SSSWindow extends Window {
  SSS: any
  requestSSS: any
  isAllowedSSS: any
  installedSSS: any
  allowSSS: any
}
declare const window: SSSWindow

export const getActiveAccountToken = (
  publicKey: string,
  payload?: any,
  encryptedMessage?: string
): Promise<string> => {
  const defaultPayload = {
    signerAddress: window.SSS.activeAddress,
    iat: new Date().getTime(),
    verifierAddress: PublicAccount.createFromPublicKey(
      publicKey,
      window.SSS.activeNetworkType
    ).address.plain(),
    netWork: window.SSS.activeNetworkType,
  }

  const p = Object.assign(payload === undefined ? {} : payload, defaultPayload)
  p.encryptedMessage = encryptedMessage
  window.SSS.isSet = true
  window.postMessage(
    {
      function: SET_MESSAGE,
      message: JSON.stringify(p),
      pubkey: publicKey,
    },
    '*'
  )

  if (!window.SSS.isSet) {
    console.error('404')
    showSnackbar('alert_notfound_tx')
    return
  }

  window.postMessage(
    {
      function: REQUEST_ACTIVE_ACCOUNT_TOKEN,
    },
    '*'
  )

  showSnackbar('alert_request_sign')

  return new Promise((resolve, reject) => {
    let count = 0
    window.SSS.isSet = false

    const timer = setInterval(() => {
      if (window.SSS.signedFrag) {
        window.SSS.signedFrag = false
        clearInterval(timer)
        showSnackbar('alert_succsess_sign')
        const msg = window.SSS.encryptMessage as EncryptedMessage
        resolve(msg.payload)
      }
      if (600 < count) {
        window.postMessage(
          {
            function: REMOVE_DATA,
          },
          '*'
        )
        clearInterval(timer)
        reject('ERROR: The transaction was not signed.')
        showSnackbar('alert_failed_sign')
      }
      count++
    }, 100)
  })
}

export const setEncriptionMessage = (message: string, pubkey: string) => {
  window.SSS.isSet = true
  window.postMessage(
    {
      function: SET_MESSAGE,
      message: message,
      pubkey: pubkey,
    },
    '*'
  )
}

export const requestEncriptMessage = (): Promise<EncryptedMessage> => {
  if (!window.SSS.isSet) {
    console.error('404')
    showSnackbar('alert_notfound_tx')
  }

  window.postMessage(
    {
      function: REQUEST_MESSAGE_ENCODE,
    },
    '*'
  )

  showSnackbar('alert_request_sign')

  return new Promise((resolve, reject) => {
    let count = 0
    window.SSS.isSet = false

    const timer = setInterval(() => {
      if (window.SSS.signedFrag) {
        window.SSS.signedFrag = false
        clearInterval(timer)
        showSnackbar('alert_succsess_sign')
        resolve(window.SSS.encryptMessage as EncryptedMessage)
      }
      if (600 < count) {
        window.postMessage(
          {
            function: REMOVE_DATA,
          },
          '*'
        )
        clearInterval(timer)
        reject('ERROR: The transaction was not signed.')
        showSnackbar('alert_failed_sign')
      }
      count++
    }, 100)
  })
}
