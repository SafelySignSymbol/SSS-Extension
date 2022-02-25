import { getStorage, setStorage } from '.'

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

export const deleteAllowList = (arrayNum: number) => {
  return new Promise((resolve, reject) => {
    getAllowList().then((al) => {
      const newAllowList = al.filter((_domain, i) => arrayNum !== i)

      chrome.storage.local
        .set({
          allowList: newAllowList,
        })
        .then(() => {
          resolve({})
        })
        .catch(() => {
          reject()
        })
    })
  })
}
