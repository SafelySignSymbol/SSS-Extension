import { Transaction, TransactionMapping } from 'symbol-sdk'
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

  console.log('tx', tx)

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

  // const h = !!tx.transactionInfo ? '' : tx.transactionInfo.hash
  // console.log('h', h)

  // window.postMessage(
  //   {
  //     function: 'setTransaction',
  //     hash: h,
  //     tx: transactionURI,
  //   },
  //   '*'
  // )
}

export const requestSign = () => {
  if (!window.SSS.isSet) {
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
    window.SSS.isSet = false

    const timer = setInterval(() => {
      if (window.SSS.signedFrag) {
        window.SSS.signedFrag = false
        clearInterval(timer)
        showSnackbar('トランザクションの署名に成功しました。')
        resolve(window.SSS.signedTx)
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
