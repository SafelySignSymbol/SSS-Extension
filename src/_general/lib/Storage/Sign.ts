import { setStorage, getStorage } from '.'

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
  setStorage({ cosignatories: accounts })
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
