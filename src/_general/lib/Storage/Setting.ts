import { getStorage, setStorage } from '.'

export type Setting = {
  lang: string
  session: number
  transactionSize: number
}

export const InitSetting: Setting = {
  lang: 'INIT',
  session: 0,
  transactionSize: 50,
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
