import { Account } from 'symbol-sdk'
import { showSnackbar } from './snackbar'

interface SSSWindow extends Window {
  SSS: any
  requestSSS: any
  isAllowedSSS: any
  installedSSS: any
  allowSSS: any
}

declare const window: SSSWindow

export const requestSignWithCosignatories = (cosignatories: Account[]) => {
  if (!window.SSS.isSet) {
    console.error('404')
    showSnackbar('alert_notfound_tx')
    return
  }
  window.postMessage(
    {
      function: 'requestSignWithCosignatories',
      cosignatories: cosignatories.map((c) => c.privateKey),
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
        resolve(window.SSS.signedTx)
      }
      if (600 < count) {
        clearInterval(timer)
        reject('ERROR: The transaction was not signed.')
        showSnackbar('alert_failed_sign')
      }
      count++
    }, 100)
  })
}
