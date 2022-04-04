import { getStorage, setStorage } from '.'

export const getTransaction = (): Promise<{
  tx: string
  hash: string
}> => {
  return new Promise((resolve) => {
    getStorage('transaction').then((transaction) => {
      getStorage('transactionHash').then((hash) => {
        const tx = transaction as {
          transaction: string
        }
        const txHash = hash as {
          transactionHash: string
        }
        console.log('gt', hash)
        resolve({ tx: tx.transaction, hash: txHash.transactionHash })
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
