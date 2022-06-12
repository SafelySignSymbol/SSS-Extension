import { getStorage, getExtensionAccount, setStorage } from '.'
import { ExtensionAccount } from '../../model/ExtensionAccount'

export const getActiveAccount = (): Promise<ExtensionAccount> => {
  return new Promise((resolve) => {
    getStorage('activeAccount').then((activeAccount) => {
      resolve(activeAccount as ExtensionAccount)
    })
  })
}

export const setActiveAccount = (arrayNum: number) => {
  return new Promise((resolve) => {
    getExtensionAccount(arrayNum).then((acc) => {
      setStorage({ activeAccount: acc })
      resolve({})
    })
  })
}
