import { getExtensionAccounts } from './ExtensionAccount'
import { NetworkType } from 'symbol-sdk'
import { getStorage, getExtensionAccount, setStorage } from '.'
import { ExtensionAccount } from '../../model/ExtensionAccount'
import { ActiveAccount } from '../../model/ActiveAccount'

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

export const getAccountIndexByAddress = (addr: string): Promise<number> => {
  let index = 0
  return new Promise((resolve) => {
    getExtensionAccounts().then((accs) => {
      accs.forEach((a, i) => {
        if (a.address === addr) {
          index = i
        }
      })
      resolve(index)
    })
  })
}

export const getActiveAccountV2 = (
  network: NetworkType
): Promise<ExtensionAccount> => {
  return new Promise((resolve, reject) => {
    getStorage('activeAccounts').then((data) => {
      const activeAccounts: ActiveAccount[] = data as ActiveAccount[]
      if (activeAccounts === undefined || activeAccounts.length === 0) {
        reject(`NOT SET ACTIVE ACCOUNT ${activeAccounts}`)
      } else {
        const accs = activeAccounts.filter((a) => a.net_type === network)
        if (accs.length === 0) {
          reject('NOT SET ACTIVE ACCOUNT')
        } else {
          resolve(accs[0].account)
        }
      }
    })
  })
}

export const setActiveAccountV2 = (arrayNum: number, network: NetworkType) => {
  return new Promise((resolve) => {
    getStorage('activeAccounts').then((data) => {
      const activeAccounts: ActiveAccount[] = (data as ActiveAccount[]).filter(
        (a) => a.net_type !== network
      )

      // console.log({ activeAccounts })
      getExtensionAccount(arrayNum).then((acc) => {
        const newAccount = {
          account: acc,
          net_type: network,
        }

        activeAccounts.push(newAccount)
        setStorage({
          activeAccounts: activeAccounts,
        })
        resolve({})
      })
    })
  })
}
