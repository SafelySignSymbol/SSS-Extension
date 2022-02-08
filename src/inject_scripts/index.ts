import { Account, MosaicId, Transaction } from 'symbol-sdk'
import { requestSign, setTransaction } from './signTransaction'

export {}

window.SSS = {
  isSet: false,
  signedFrag: false,
  signedTx: null,
  activePublicKey: '',
  setTransaction: setTransaction,
  setTransactionWithCosignatories: (
    tx: Transaction,
    cosignatories: Account[]
  ) => {},
  checkLogin: (mosaicId: MosaicId): boolean => {
    console.log('mosaicId', mosaicId)
    return false
  },
  requestSign: requestSign,
}

window.addEventListener('message', async (event) => {
  console.log('msg', event.data)
  if (event.data.type === 'SIGNED_TRANSACTION') {
    SSS.signedTx = event.data.signedTx
    SSS.signedFrag = true
    SSS.isSet = false
  }
  if (event.data.type === 'SET_PUBLIC_KEY') {
    SSS.activePublicKey = event.data.publicKey
  }
})

window.onload = () => {
  const snackbar = document.createElement('div')
  snackbar.classList.add('snackbar')
  snackbar.id = 'snackbar'
  document.body.appendChild(snackbar)
}
