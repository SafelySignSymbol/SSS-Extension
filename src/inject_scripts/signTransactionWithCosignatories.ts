import { Account } from 'symbol-sdk'
import { setCosignatories } from '../_general/lib/Storage'
import { showSnackbar } from './snackbar'

export const requestSignWithCosignatories = (cosignatories: Account[]) => {
  if (!SSS.isSet) {
    console.error('404')
    showSnackbar('トランザクションがセットされていません。')
    return
  }
  window.postMessage(
    {
      function: 'requestSignWithCosignatories',
      cosignatories: cosignatories.map((c) => c.privateKey),
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
        clearInterval(timer)
        reject('ERROR: The transaction was not signed.')
        showSnackbar('トランザクションの署名に失敗しました。')
      }
      count++
    }, 100)
  })
}
