import { getStorage, setStorage } from '.'

export const getTransaction = (): Promise<{
  tx: string
  hash: string
}> => {
  return new Promise((resolve) => {
    getStorage('transaction').then((transaction) => {
      getStorage('transactionHash').then((hash) => {
        resolve({ tx: transaction as string, hash: hash as string })
      })
    })
  })
}

export const setTransaction = (tx: string) => {
  setStorage({ transaction: tx })
}
export const setTransactionHash = (hash: string) => {
  setStorage({ transactionHash: hash })
}
export const removeTransaction = () => {
  setStorage({ transaction: null })
}
