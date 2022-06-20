import { CosignatureSignedTransaction, UInt64 } from 'symbol-sdk'
import { REQUEST_SIGN_COSIGNATURE } from '../_general/model/MessageType'
import { showSnackbar } from './snackbar'

interface SSSWindow extends Window {
  SSS: any
  requestSSS: any
  isAllowedSSS: any
  installedSSS: any
  allowSSS: any
}

declare const window: SSSWindow

export const requestSignCosignatureTransaction =
  (): Promise<CosignatureSignedTransaction> => {
    if (!window.SSS.isSet) {
      console.error('404')
      showSnackbar('alert_notfound_tx')
    }
    window.postMessage(
      {
        function: REQUEST_SIGN_COSIGNATURE,
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
          const tx = window.SSS.signedTx as CosignatureSignedTransaction
          resolve(
            new CosignatureSignedTransaction(
              tx.parentHash,
              tx.signature,
              tx.signerPublicKey,
              UInt64.fromNumericString('0')
            )
          )
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
