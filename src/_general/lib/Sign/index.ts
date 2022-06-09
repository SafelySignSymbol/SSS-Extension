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
import { SIGN_MESSAGE, SIGN_TRANSACTION } from '../../model/MessageType'

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
  chrome.runtime.sendMessage({
    type: SIGN_MESSAGE,
    encryptMessage: msg,
  })
  // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  //   if (!tabs[0].id) {
  //     console.error('not found tabs')
  //     return
  //   }
  //   chrome.tabs.sendMessage(tabs[0].id, {
  //     type: SIGN_MESSAGE,
  //     encryptMessage: msg,
  //   })
  // })
}

export const sign = (
  transaction: Transaction,
  priKey: string,
  networkType: NetworkType
) => {
  const acc = Account.createFromPrivateKey(priKey, networkType)

  const generationHash = getGenerationHash(networkType)

  const signedTx = acc.sign(transaction, generationHash)
  addHistory(signedTx)
  removeTransaction()
  chrome.runtime.sendMessage({
    type: SIGN_TRANSACTION,
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
  chrome.runtime.sendMessage({
    type: SIGN_TRANSACTION,
    signedTx: signedTx,
  })
}

export const signWithCosignatories = (
  transaction: AggregateTransaction,
  accounts: Account[],
  priKey: string,
  networkType: NetworkType
) => {
  const acc = Account.createFromPrivateKey(priKey, networkType)

  const generationHash = getGenerationHash(networkType)

  const signedTx = acc.signTransactionWithCosignatories(
    transaction,
    accounts,
    generationHash
  )
  addHistory(signedTx)
  removeTransaction()
  chrome.runtime.sendMessage({
    type: SIGN_TRANSACTION,
    signedTx: signedTx,
  })
}
