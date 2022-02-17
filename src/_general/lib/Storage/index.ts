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
    history: [],
    allowList: '',
  })
}

export * from './ExtensionAccount'
export * from './ActiveAccount'
export * from './Transaction'
export * from './Sign'
export * from './History'
export * from './AllowList'
