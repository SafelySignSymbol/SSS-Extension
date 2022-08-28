import { NetworkType } from 'symbol-sdk'
import { getStorage, setStorage } from '.'

export type Setting = {
  lang: string
  session: number
  transactionSize: number
  networkType: NetworkType
}

export const InitSetting: Setting = {
  lang: 'INIT',
  session: 0,
  transactionSize: 50,
  networkType: NetworkType.MAIN_NET,
}

export const getSetting = (): Promise<Setting> => {
  return new Promise((resolve) => {
    getStorage('setting').then((setting) => {
      resolve(setting as Setting)
    })
  })
}

export const setSetting = (setting: Setting) => {
  setStorage({ setting: setting })
}

export const changeLang = (lang: string): Promise<Setting> => {
  return new Promise((resolve) => {
    getSetting().then((data) => {
      const newData = data
      newData.lang = lang
      setSetting(newData)
      resolve(newData)
    })
  })
}
export const changeSize = (size: number): Promise<Setting> => {
  return new Promise((resolve) => {
    getSetting().then((data) => {
      const newData = data
      newData.transactionSize = size
      setSetting(newData)
      resolve(newData)
    })
  })
}
export const changeNetwork = (netType: NetworkType): Promise<Setting> => {
  return new Promise((resolve) => {
    getSetting().then((data) => {
      const newData = data
      newData.networkType = netType
      setSetting(newData)
      resolve(newData)
    })
  })
}
export const changeSession = (session: number): Promise<Setting> => {
  return new Promise((resolve) => {
    getSetting().then((data) => {
      const newData = data
      newData.session = session
      setSetting(newData)
      resolve(newData)
    })
  })
}
export const getSession = (): Promise<number> => {
  return new Promise((resolve) => {
    getSetting().then((data) => {
      resolve(data.session)
    })
  })
}

export const resetLocalSession = (): void => {
  localStorage.removeItem('login_session')
}

export const checkLoginSession = (): boolean => {
  const now = new Date().getTime()
  const session = JSON.parse(
    localStorage.getItem('login_session') || '{}'
  ).session

  return now < session
}
