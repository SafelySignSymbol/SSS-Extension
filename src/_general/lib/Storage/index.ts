import {
  ExtensionAccount,
  IExtensionAccount,
} from '../../model/ExtensionAccount'

const setStorage = (data: any) => {
  chrome.storage.local.set(data)
}

const getStorage = (key: string) => {
  return new Promise((resolve) => {
    chrome.storage.local.get(key, (data) => resolve(data))
  })
}

export const initialize = () => {
  setStorage({
    extensionAccounts: [],
    accountsCount: 0,
    activeAccount: null,
    transaction: null,
  })
}

export const addExtensionAccount = (account: IExtensionAccount) => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(['extensionAccounts', 'accountsCount'], (data) => {
      const test = data.extensionAccounts.filter(
        (e: ExtensionAccount) => e.address === account.address
      )

      console.log('test', test)

      if (test.length !== 0) {
        console.log('reject')
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

        console.log('add', newExtensionAccounts)
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
        console.log('acc1', acc.address)
        console.log('acc2', data.extensionAccounts[arrayNum].address)
        if (
          acc.address === data.extensionAccounts[arrayNum].address &&
          data.extensionAccounts.length !== 1
        ) {
          console.log('reject this is active')
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

export const getActiveAccount = (): Promise<ExtensionAccount> => {
  return new Promise((resolve) => {
    getStorage('activeAccount').then((activeAccount) => {
      const a = activeAccount as {
        activeAccount: ExtensionAccount
      }
      resolve(a.activeAccount as ExtensionAccount)
    })
  })
}

export const setActiveAccount = (arrayNum: number) => {
  return new Promise((resolve) => {
    getExtensionAccount(arrayNum).then((acc) => {
      console.log('acc: ' + arrayNum, acc)
      setStorage({ activeAccount: acc })
      resolve({})
    })
  })
}
