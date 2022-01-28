import {
  ExtensionAccount,
  IExtensionAccount,
} from '../../model/ExtensionAccount'

export const setStorage = (data: any) => {
  chrome.storage.local.set(data)
}

export const getStorage = (key: string) => {
  return new Promise((resolve) => {
    chrome.storage.local.get(key, (data) => resolve(data))
  })
}

export const addExtensionAccount = (account: IExtensionAccount) => {
  return new Promise(() => {
    chrome.storage.local.get(['extensionAccounts', 'accountsCount'], (data) => {
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
    })
  })
}

export const getExtensionAccounts = (): Promise<ExtensionAccount[]> => {
  return new Promise((resolve) => {
    getStorage('extensionAccounts').then((extensionAccounts) => {
      const a = extensionAccounts as {
        extensionAccounts: ExtensionAccount[]
      }
      resolve(a.extensionAccounts)
    })
  })
}
export const getExtensionAccount = (
  arrayNum: number
): Promise<ExtensionAccount> => {
  return new Promise((resolve, reject) => {
    getExtensionAccounts().then((extensionAccounts) => {
      if (extensionAccounts.length < 0 || extensionAccounts.length < arrayNum) {
        reject('out of bounce')
      } else {
        resolve(extensionAccounts[arrayNum])
      }
    })
  })
}

export const getActiveAccount = () => {
  return new Promise((resolve) => {
    getStorage('activeAccount').then((activeAccount) => {
      resolve(activeAccount)
    })
  })
}

export const setActiveAccount = (arrayNum: number) => {
  return new Promise(() => {
    getExtensionAccount(arrayNum).then((acc) => {
      console.log('acc', acc)
      setStorage({ activeAccount: acc })
    })
  })
}
