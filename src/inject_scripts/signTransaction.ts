import { SignedTransaction, Transaction, TransactionMapping } from 'symbol-sdk'
import { TransactionURI } from 'symbol-uri-scheme'

import { showSnackbar } from './snackbar'

interface SSSWindow extends Window {
  SSS: any
  requestSSS: any
  isAllowedSSS: any
  installedSSS: any
  allowSSS: any
}

declare const window: SSSWindow

export const setTransaction = (tx: Transaction) => {
  const serializedTx = tx.serialize()
  const transactionURI = new TransactionURI(
    serializedTx,
    TransactionMapping.createFromPayload
  ).build()

  window.SSS.isSet = true

  // console.log('tx', tx)

  if (!!tx.transactionInfo) {
    window.postMessage(
      {
        function: 'setTransaction',
        hash: tx.transactionInfo.hash,
        tx: transactionURI,
      },
      '*'
    )
  } else {
    window.postMessage(
      {
        function: 'setTransaction',
        tx: transactionURI,
      },
      '*'
    )
  }
}

export const requestSign = (): Promise<SignedTransaction> => {
  if (!window.SSS.isSet) {
    console.error('404')
    showSnackbar('alert_notfound_tx')
    return
  }

  window.postMessage(
    {
      function: 'requestSign',
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
        resolve(
          new SignedTransaction(
            window.SSS.signedTx.payload,
            window.SSS.signedTx.hash,
            window.SSS.signedTx.signerPublicKey,
            window.SSS.signedTx.type,
            window.SSS.signedTx.NetworkType
          )
        )
      }
      if (600 < count) {
        window.postMessage(
          {
            function: 'removeTransaction',
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
