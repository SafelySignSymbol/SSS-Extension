import {
  FOCUS_PAGE,
  INJECT_SSS,
  REQUEST_SSS,
  SIGN_MESSAGE,
  SIGN_TRANSACTION,
} from './../_general/model/MessageType'
import { getNetworkTypeByAddress } from './../_general/lib/Symbol/Config'
import {
  requestSign,
  setTransaction,
  setTransactionByPayload,
} from './signTransaction'
import { requestSignWithCosignatories } from './signTransactionWithCosignatories'
import { requestSignCosignatureTransaction } from './signCosignatureTransaction'
import { showSnackbar, createSnackbar } from './snackbar'
import {
  getActiveAccountToken,
  requestEncriptMessage,
  setEncriptionMessage,
} from './signEncription'

export {}

interface SSSWindow extends Window {
  SSS: any
  requestSSS: any
  isAllowedSSS: any
  installedSSS: any
  allowSSS: any
}

declare const window: SSSWindow

window.requestSSS = () => {
  // console.log('req SSS')
  if (window.isAllowedSSS()) {
    showSnackbar('alert_succsess_connect_sss')
    return true
  }
  showSnackbar('alert_requesting_connect_sss')
  window.postMessage(
    {
      function: REQUEST_SSS,
    },
    '*'
  )
  return false
}

window.isAllowedSSS = () => {
  return !!window.SSS
}

window.addEventListener('focus', function () {
  console.log('change focus')

  window.postMessage(
    {
      function: FOCUS_PAGE,
    },
    '*'
  )
})

window.installedSSS = true
window.allowSSS = false

const injectSSS = (
  publicKey: string,
  address: string,
  name: string,
  lang: string
) => {
  createSnackbar(lang)
  setTimeout(() => {
    showSnackbar('alert_connected_sss')
  }, 100)

  window.SSS = {
    isSet: false,
    signedFrag: false,
    signedTx: null,
    encryptMessage: null,
    activePublicKey: publicKey,
    activeAddress: address,
    activeName: name,
    activeNetworkType: getNetworkTypeByAddress(address),
    setMessage: setEncriptionMessage,
    setTransaction: setTransaction,
    setTransactionByPayload: setTransactionByPayload,
    requestSign: requestSign,
    requestSignWithCosignatories: requestSignWithCosignatories,
    requestSignCosignatureTransaction: requestSignCosignatureTransaction,
    requestSignEncription: requestEncriptMessage,
    getActiveAccountToken: getActiveAccountToken,
  }
}

window.addEventListener(
  'message',
  async (event) => {
    if (event.data.type === SIGN_MESSAGE) {
      window.SSS.encryptMessage = event.data.encryptMessage
      window.SSS.signedFrag = true
      window.SSS.isSet = false
    }

    if (event.data.type === SIGN_TRANSACTION) {
      window.SSS.signedTx = event.data.signedTx
      window.SSS.signedFrag = true
      window.SSS.isSet = false
    }

    if (event.data.type === INJECT_SSS) {
      injectSSS(
        event.data.publicKey,
        event.data.address,
        event.data.name,
        event.data.lang
      )
    }
  },
  true
)
