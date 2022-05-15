import { EncryptedMessage } from 'symbol-sdk'
import { showSnackbar } from './snackbar'

interface SSSWindow extends Window {
  SSS: any
  requestSSS: any
  isAllowedSSS: any
  installedSSS: any
  allowSSS: any
}
declare const window: SSSWindow

export const setEncriptionMessage = (message: string, pubkey: string) => {
  window.SSS.isSet = true
  window.postMessage(
    {
      function: 'setEncriptionMessage',
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
    return
  }

  window.postMessage(
    {
      function: 'requestEncriptMessage',
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
            function: 'removeMessage',
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
