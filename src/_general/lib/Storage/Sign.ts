import { setStorage, getStorage } from '.'

export const setSignStatus = (status: string) => {
  setStorage({ signStatus: status })
}
export const getSignStatus = (): Promise<string> => {
  return new Promise((resolve) => {
    getStorage('signStatus').then((status) => {
      resolve(status as string)
    })
  })
}

export const setCosignatories = (accounts: string[]) => {
  setStorage({ cosignatories: accounts })
}

export const getCosignatories = (): Promise<string[]> => {
  return new Promise((resolve) => {
    getStorage('cosignatories').then((cosignatories) => {
      resolve(cosignatories as string[])
    })
  })
}
