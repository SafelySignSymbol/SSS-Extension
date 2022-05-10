import { InitSetting } from './Setting'

export const version = '1.1.1'

export const setStorage = (data: any) => {
  chrome.storage.local.set(data)
}

export const getStorage = (key: string) => {
  return new Promise((resolve) => {
    chrome.storage.local.get(key, (data) => resolve(data))
  })
}

export const getPreviousVersion = (): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get('version', (data) => {
      if (!data.version) {
        reject()
      } else {
        const prevVersion = (data.version as string).split('.')
        resolve(prevVersion)
      }
    })
  })
}

export const initialize = () => {
  const current = version.split('.')
  getPreviousVersion()
    .then((prev) => {
      if (prev[0] !== current[0]) {
        init()
      } else {
        setStorage({
          version: version,
        })
        chrome.storage.local.get(null, (data) => {
          if (data.setting === undefined) {
            setStorage({
              setting: InitSetting,
            })
          }
        })
      }
    })
    .catch(() => {
      // console.log('catch')
      init()
    })
}

const init = () => {
  setStorage({
    extensionAccounts: [],
    accountsCount: 0,
    activeAccount: null,
    transaction: null,
    signStatus: '',
    cosignatories: [],
    history: [],
    allowList: '',
    version: version,
    setting: InitSetting,
  })
}

export * from './ExtensionAccount'
export * from './ActiveAccount'
export * from './Transaction'
export * from './Sign'
export * from './History'
export * from './AllowList'
