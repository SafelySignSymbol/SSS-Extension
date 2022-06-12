import { getStorage, getActiveAccount, setStorage } from '.'
import {
  IExtensionAccount,
  ExtensionAccount,
} from '../../model/ExtensionAccount'

export const addExtensionAccount = (account: IExtensionAccount) => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(['extensionAccounts', 'accountsCount'], (data) => {
      const test = data.extensionAccounts.filter(
        (e: ExtensionAccount) => e.address === account.address
      )

      if (test.length !== 0) {
        return reject('allready added')
      } else {
        const newExtensionAccounts: ExtensionAccount[] = [
          ...data.extensionAccounts,
          account,
        ]
        const newAccountsCount: number = data.accountsCount + 1

        if (data.accountsCount === 0) {
          chrome.storage.local.set({
            activeAccount: account,
          })
        }

        chrome.storage.local.set({
          extensionAccounts: newExtensionAccounts,
          accountsCount: newAccountsCount,
        })
        resolve(account)
      }
    })
  })
}

export const getExtensionAccounts = (): Promise<ExtensionAccount[]> => {
  return new Promise((resolve) => {
    getStorage('extensionAccounts').then((extensionAccounts) => {
      resolve(extensionAccounts as ExtensionAccount[])
    })
  })
}
export const getExtensionAccount = (
  arrayNum: number
): Promise<ExtensionAccount> => {
  return new Promise((resolve, reject) => {
    getExtensionAccounts().then((extensionAccounts) => {
      if (extensionAccounts.length < 0 || extensionAccounts.length < arrayNum) {
        return reject('out of bounce')
      } else {
        resolve(extensionAccounts[arrayNum])
      }
    })
  })
}

export const deleteExtensionAccount = (arrayNum: number) => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(['extensionAccounts', 'accountsCount'], (data) => {
      getActiveAccount().then((acc) => {
        if (
          acc.address === data.extensionAccounts[arrayNum].address &&
          data.extensionAccounts.length !== 1
        ) {
          return reject()
        } else {
          if (data.extensionAccounts.length === 1) {
            setStorage({ activeAccount: null })
          }
          const newExtensionAccounts: ExtensionAccount[] =
            data.extensionAccounts.filter(
              (_acc: ExtensionAccount, i: number) => arrayNum !== i
            )
          const newAccountsCount: number = data.accountsCount - 1

          chrome.storage.local.set({
            extensionAccounts: newExtensionAccounts,
            accountsCount: newAccountsCount,
          })
          resolve({})
        }
      })
    })
  })
}
