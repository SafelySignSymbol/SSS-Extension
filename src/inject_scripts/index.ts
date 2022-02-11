import { requestSign, setTransaction } from './signTransaction'
import { requestSignWithCosignatories } from './signTransactionWithCosignatories'
import { showSnackbar } from './snackbar'

export {}

// window.SSS = {
//   isSet: false,
//   signedFrag: false,
//   signedTx: null,
//   activePublicKey: '',
//   setTransaction: setTransaction,
//   requestSign: requestSign,
//   requestSignWithCosignatories: requestSignWithCosignatories,
// }

window.requestSSS = () => {
  console.log('req SSS')
  if (window.isAllowedSSS()) {
    showSnackbar('SSSと連携に成功しました。')
    return true
  }
  showSnackbar('WebアプリケーションとSSSを連携してください。')
  window.postMessage(
    {
      function: 'requestSSS',
    },
    '*'
  )
  return false
}

window.isAllowedSSS = () => {
  return !!window.SSS
}

window.installedSSS = true
window.allowSSS = false

const injectSSS = (publicKey: string) => {
  console.log('inject sss')
  showSnackbar('SSSと連携しました。')
  window.SSS = {
    isSet: false,
    signedFrag: false,
    signedTx: null,
    activePublicKey: publicKey,
    setTransaction: setTransaction,
    requestSign: requestSign,
    requestSignWithCosignatories: requestSignWithCosignatories,
  }
}

window.addEventListener(
  'message',
  async (event) => {
    console.log(event)
    console.log('event', event)
    if (event.data.type === 'SIGNED_TRANSACTION') {
      SSS.signedTx = event.data.signedTx
      SSS.signedFrag = true
      SSS.isSet = false
    }
    if (event.data.type === 'INJECT_SSS') {
      injectSSS(event.data.publicKey)
    }
  },
  true
)

window.onload = () => {
  const snackbar = document.createElement('div')
  snackbar.classList.add('SSS_snackbar')
  snackbar.id = 'SSS_snackbar'
  document.body.appendChild(snackbar)
}
