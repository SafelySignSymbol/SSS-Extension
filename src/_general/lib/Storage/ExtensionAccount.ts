import { getNetworkTypeByAddress } from './../Symbol/Config'
import { getActiveAccountV2, setActiveAccountV2 } from './ActiveAccount'
import { NetworkType } from 'symbol-sdk'
import { getStorage, setStorage } from '.'
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

        chrome.storage.local
          .set({
            extensionAccounts: newExtensionAccounts,
            accountsCount: newAccountsCount,
          })
          .then(() => {
            // 追加したアカウントと同じネットワークのアカウントが一つもなかったらアクティブアカウントにする
            const nt = getNetworkTypeByAddress(account.address)
            const arr = data.extensionAccounts.filter(
              (e: ExtensionAccount) => getNetworkTypeByAddress(e.address) === nt
            )

            if (arr.length === 0) {
              setActiveAccountV2(
                data.accountsCount,
                getNetworkTypeByAddress(account.address)
              )
            }
            //

            resolve(account)
          })
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

export const deleteExtensionAccount = (
  arrayNum: number,
  network: NetworkType
) => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(['extensionAccounts', 'accountsCount'], (data) => {
      getActiveAccountV2(network).then((acc) => {
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

export const deleteAllAccount = () => {
  setStorage({ activeAccounts: [], extensionAccounts: [] })
}
