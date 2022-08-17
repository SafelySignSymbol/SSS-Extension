import { getGenerationHash } from './../Symbol/Config'
import {
  Transaction,
  NetworkType,
  Account,
  AggregateTransaction,
  CosignatureTransaction,
  PublicAccount,
} from 'symbol-sdk'
import { addHistory } from '../Storage'
import { SIGN_MESSAGE, SIGN_TRANSACTION } from '../../model/MessageType'
import { ExtensionAccount } from '../../model/ExtensionAccount'

// export const encription = (
//   message: string,
//   pubKey: string,
//   priKey: string,
//   networkType: NetworkType
// ) => {
//   const acc = Account.createFromPrivateKey(priKey, networkType)
//   const msg = acc.encryptMessage(
//     message,
//     PublicAccount.createFromPublicKey(pubKey, networkType)
//   )
//   chrome.runtime.sendMessage({
//     type: SIGN_MESSAGE,
//     encryptMessage: msg,
//   })
// }

export const encription = (
  message: string,
  pubKey: string,
  extensionAccount: ExtensionAccount,
  password: string
) => {
  const acc = extensionAccount.getAccount(password)
  const msg = acc.encryptMessage(
    message,
    PublicAccount.createFromPublicKey(pubKey, extensionAccount.getNetworktype())
  )
  chrome.runtime.sendMessage({
    type: SIGN_MESSAGE,
    encryptMessage: msg,
  })
}

// export const sign = (
//   transaction: Transaction,
//   priKey: string,
//   networkType: NetworkType
// ) => {
//   const acc = Account.createFromPrivateKey(priKey, networkType)

//   const generationHash = getGenerationHash(networkType)

//   const signedTx = acc.sign(transaction, generationHash)
//   addHistory(signedTx)
//   chrome.runtime.sendMessage({
//     type: SIGN_TRANSACTION,
//     signedTx: signedTx,
//   })
// }

export const sign = (
  transaction: Transaction,
  extensionAccount: ExtensionAccount,
  password: string
) => {

  const generationHash = extensionAccount.getGenerationHash()
  const acc = extensionAccount.getAccount(password)

  const signedTx = acc.sign(transaction, generationHash)
  addHistory(signedTx)
  chrome.runtime.sendMessage({
    type: SIGN_TRANSACTION,
    signedTx: signedTx,
  })
}

// export const signCosignatureTransaction = (
//   payload: string,
//   priKey: string,
//   networkType: NetworkType
// ) => {
//   const acc = Account.createFromPrivateKey(priKey, networkType)
//   const signedTx = CosignatureTransaction.signTransactionPayload(
//     acc,
//     payload,
//     getGenerationHash(networkType)
//   )
//   // removeTransaction()
//   chrome.runtime.sendMessage({
//     type: SIGN_TRANSACTION,
//     signedTx: signedTx,
//   })
// }

export const signCosignatureTransaction = (
  payload: string,
  extensionAccount: ExtensionAccount,
  password: string
) => {

  const acc = extensionAccount.getAccount(password)
  const generationHash = extensionAccount.getGenerationHash()
  const signedTx = CosignatureTransaction.signTransactionPayload(
    acc,
    payload,
    generationHash
  )
  // removeTransaction()
  chrome.runtime.sendMessage({
    type: SIGN_TRANSACTION,
    signedTx: signedTx,
  })
}

// export const signWithCosignatories = (
//   transaction: AggregateTransaction,
//   accounts: Account[],
//   priKey: string,
//   networkType: NetworkType
// ) => {
//   const acc = Account.createFromPrivateKey(priKey, networkType)

//   const generationHash = getGenerationHash(networkType)

//   const signedTx = acc.signTransactionWithCosignatories(
//     transaction,
//     accounts,
//     generationHash
//   )
//   addHistory(signedTx)
//   // removeTransaction()
//   chrome.runtime.sendMessage({
//     type: SIGN_TRANSACTION,
//     signedTx: signedTx,
//   })
// }

export const signWithCosignatories = (
  transaction: AggregateTransaction,
  accounts: Account[],
  extensionAccount: ExtensionAccount,
  password: string
) => {
  const acc = extensionAccount.getAccount(password)

  const generationHash = extensionAccount.getGenerationHash()

  const signedTx = acc.signTransactionWithCosignatories(
    transaction,
    accounts,
    generationHash
  )
  addHistory(signedTx)
  // removeTransaction()
  chrome.runtime.sendMessage({
    type: SIGN_TRANSACTION,
    signedTx: signedTx,
  })
}

