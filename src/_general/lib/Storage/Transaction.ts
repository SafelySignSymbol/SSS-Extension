import { getStorage, setStorage } from '.'

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
