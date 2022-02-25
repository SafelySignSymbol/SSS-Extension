import { Transaction, TransactionMapping } from 'symbol-sdk'
import { TransactionURI } from 'symbol-uri-scheme'

import { showSnackbar } from './snackbar'

export const setTransaction = (tx: Transaction) => {
  const serializedTx = tx.serialize()
  const transactionURI = new TransactionURI(
    serializedTx,
    TransactionMapping.createFromPayload
  ).build()

  SSS.isSet = true

  window.postMessage(
    {
      function: 'setTransaction',
      tx: transactionURI,
    },
    '*'
  )
}

export const requestSign = () => {
  if (!SSS.isSet) {
    console.error('404')
    showSnackbar('トランザクションがセットされていません。')
    return
  }

  window.postMessage(
    {
      function: 'requestSign',
    },
    '*'
  )

  showSnackbar('SSSへ署名が要求されました。')

  return new Promise((resolve, reject) => {
    let count = 0
    SSS.isSet = false

    const timer = setInterval(() => {
      if (SSS.signedFrag) {
        SSS.signedFrag = false
        clearInterval(timer)
        showSnackbar('トランザクションの署名に成功しました。')
        resolve(SSS.signedTx)
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
        showSnackbar('トランザクションの署名に失敗しました。')
      }
      count++
    }, 100)
  })
}
