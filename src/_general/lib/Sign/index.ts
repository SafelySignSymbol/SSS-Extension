import {
  Transaction,
  Account,
  AggregateTransaction,
  CosignatureTransaction,
  PublicAccount,
} from 'symbol-sdk'
import { addHistory } from '../Storage'
import { SIGN_MESSAGE, SIGN_TRANSACTION } from '../../model/MessageType'
import { ExtensionAccount } from '../../model/ExtensionAccount'

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
  chrome.runtime.sendMessage({
    type: SIGN_TRANSACTION,
    signedTx: signedTx,
  })
}

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
  chrome.runtime.sendMessage({
    type: SIGN_TRANSACTION,
    signedTx: signedTx,
  })
}
