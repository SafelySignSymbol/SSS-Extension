import { getStorage, setStorage } from '.'

export type Setting = {
  lang: string
  session: number
}

export const InitSetting: Setting = {
  lang: 'INIT',
  session: 0,
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
