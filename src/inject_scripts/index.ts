import { Account, MosaicId, Transaction } from 'symbol-sdk'
import { requestSign, setTransaction } from './signTransaction'
import { requestSignWithCosignatories } from './signTransactionWithCosignatories'

export {}

window.SSS = {
  isSet: false,
  signedFrag: false,
  signedTx: null,
  activePublicKey: '',
  setTransaction: setTransaction,
  checkLogin: (mosaicId: MosaicId): boolean => {
    return false
  },
  requestSign: requestSign,
  requestSignWithCosignatories: requestSignWithCosignatories,
}

window.addEventListener(
  'message',
  async (event) => {
    if (event.data.type === 'SIGNED_TRANSACTION') {
      SSS.signedTx = event.data.signedTx
      SSS.signedFrag = true
      SSS.isSet = false
    }
    if (event.data.type === 'SET_PUBLIC_KEY') {
      SSS.activePublicKey = event.data.publicKey
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
