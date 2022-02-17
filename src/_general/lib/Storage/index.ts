export const setStorage = (data: any) => {
  chrome.storage.local.set(data)
}

export const getStorage = (key: string) => {
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
    signStatus: '',
    cosignatories: [],
<<<<<<< HEAD
    history: [],
  })
}

export * from './ExtensionAccount'
export * from './ActiveAccount'
export * from './Transaction'
export * from './Sign'
export * from './History'
=======
    allowList: [],
  })
}

export const addExtensionAccount = (account: IExtensionAccount) => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(['extensionAccounts', 'accountsCount'], (data) => {
      const test = data.extensionAccounts.filter(
        (e: ExtensionAccount) => e.address === account.address
      )

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
      setStorage({ activeAccount: acc })
      resolve({})
    })
  })
}

export const getTransaction = (): Promise<string> => {
  return new Promise((resolve) => {
    getStorage('transaction').then((transaction) => {
      const tx = transaction as {
        transaction: string
      }
      resolve(tx.transaction as string)
    })
  })
}

export const setTransaction = (tx: string) => {
  setStorage({ transaction: tx })
}
export const removeTransaction = () => {
  setStorage({ transaction: null })
}

export const setSignStatus = (status: string) => {
  setStorage({ signStatus: status })
}
export const getSignStatus = (): Promise<string> => {
  return new Promise((resolve) => {
    getStorage('signStatus').then((status) => {
      const st = status as {
        signStatus: string
      }
      resolve(st.signStatus as string)
    })
  })
}

export const setCosignatories = (accounts: string[]) => {
  setStorage({ cosignatories: accounts }) // なんか二重に配列になってる
}

export const getCosignatories = (): Promise<string[]> => {
  return new Promise((resolve) => {
    getStorage('cosignatories').then((cosignatories) => {
      const c = cosignatories as {
        cosignatories: string[]
      }
      resolve(c.cosignatories as string[])
    })
  })
}

export const getAllowList = (): Promise<string[]> => {
  return new Promise((resolve) => {
    getStorage('allowList').then((allowList) => {
      const list = allowList as {
        allowList: string[]
      }
      resolve(list.allowList as string[])
    })
  })
}

export const addAllowList = (domain: string) => {
  return new Promise((resolve, reject) => {
    getAllowList().then((list) => {
      const isListed = list.includes(domain)

      if (isListed) {
        return reject('allready added')
      } else {
        const newList = [...list, domain]
        setStorage({
          allowList: newList,
        })
        resolve(domain)
      }
    })
  })
}

export const isAllowDomain = (domain: string): Promise<boolean> => {
  return new Promise((resolve) => {
    getAllowList().then((list) => {
      resolve(list.includes(domain))
    })
  })
}
>>>>>>> inject_sss
