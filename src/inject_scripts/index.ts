import { getNetworkTypeByAddress } from './../_general/lib/Symbol/Config'
import { requestSign, setTransaction } from './signTransaction'
import { requestSignWithCosignatories } from './signTransactionWithCosignatories'
import {
  requestSignCosignatureTransaction,
  setTransactionByPayload,
} from './signCosignatureTransaction'
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
    // console.log(event)
    console.log('event', event)
    if (event.data.type === 'SIGNED_TRANSACTION') {
      window.SSS.signedTx = event.data.signedTx
      window.SSS.signedFrag = true
      window.SSS.isSet = false
    }
    if (event.data.type === 'SIGNED_MESSAGE') {
      console.log('ret data', event.data)
      window.SSS.encryptMessage = event.data.encryptMessage
      window.SSS.signedFrag = true
      window.SSS.isSet = false
    }
    if (event.data.type === 'INJECT_SSS') {
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
