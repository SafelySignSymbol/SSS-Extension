import { getGenerationHash } from './../Symbol/Config'
import {
  Transaction,
  NetworkType,
  Account,
  AggregateTransaction,
  CosignatureTransaction,
  PublicAccount,
} from 'symbol-sdk'
import { addHistory, removeTransaction } from '../Storage'

export const encription = (
  message: string,
  pubKey: string,
  priKey: string,
  networkType: NetworkType
) => {
  const acc = Account.createFromPrivateKey(priKey, networkType)
  const msg = acc.encryptMessage(
    message,
    PublicAccount.createFromPublicKey(pubKey, networkType)
  )
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs[0].id) {
      console.error('not found tabs')
      return
    }
    chrome.tabs.sendMessage(tabs[0].id, {
      type: 'SIGNED_MESSAGE',
      encryptMessage: msg,
    })
  })
}

export const sign = (
  transaction: Transaction,
  priKey: string,
  networkType: NetworkType
) => {
  const acc = Account.createFromPrivateKey(priKey, networkType)

  const generationHash =
    networkType === NetworkType.TEST_NET
      ? '7FCCD304802016BEBBCD342A332F91FF1F3BB5E902988B352697BE245F48E836' // TEST_NET
      : '57F7DA205008026C776CB6AED843393F04CD458E0AA2D9F1D5F31A402072B2D6' // MAIN_NET

  const signedTx = acc.sign(transaction, generationHash)
  addHistory(signedTx)
  removeTransaction()
  chrome.runtime.sendMessage({
    type: 'SIGN_TRANSACTION',
    signedTx: signedTx,
  })
}

export const signCosignatureTransaction = (
  payload: string,
  priKey: string,
  networkType: NetworkType
) => {
  const acc = Account.createFromPrivateKey(priKey, networkType)
  const signedTx = CosignatureTransaction.signTransactionPayload(
    acc,
    payload,
    getGenerationHash(networkType)
  )
  removeTransaction()
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs[0].id) {
      console.error('not found tabs')
      return
    }
    chrome.tabs.sendMessage(tabs[0].id, {
      type: 'SIGNED_TRANSACTION',
      signedTx: signedTx,
    })
  })
}

export const signWithCosignatories = (
  transaction: AggregateTransaction,
  accounts: Account[],
  priKey: string,
  networkType: NetworkType
) => {
  const acc = Account.createFromPrivateKey(priKey, networkType)

  const generationHash =
    networkType === NetworkType.TEST_NET
      ? '7FCCD304802016BEBBCD342A332F91FF1F3BB5E902988B352697BE245F48E836' // TEST_NET
      : '57F7DA205008026C776CB6AED843393F04CD458E0AA2D9F1D5F31A402072B2D6' // MAIN_NET

  const signedTx = acc.signTransactionWithCosignatories(
    transaction,
    accounts,
    generationHash
  )
  addHistory(signedTx)
  removeTransaction()
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs[0].id) {
      console.error('not found tabs')
      return
    }
    chrome.tabs.sendMessage(tabs[0].id, {
      type: 'SIGNED_TRANSACTION',
      signedTx: signedTx,
    })
  })
}
