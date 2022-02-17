import { SignedTransaction } from 'symbol-sdk'
import { getStorage, setStorage } from '.'

export const getHistory = (): Promise<SignedTransaction[]> => {
  return new Promise((resolve) => {
    getStorage('history').then((history) => {
      const h = history as {
        history: SignedTransaction[]
      }
      resolve(h.history)
    })
  })
}

export const addHistory = (tx: SignedTransaction) => {
  return new Promise((resolve) => {
    getHistory().then((history) => {
      while (5 <= history.length) {
        history.pop()
      }
      const newHistory = [tx, ...history]
      setStorage({
        history: newHistory,
      })
      resolve({})
    })
  })
}
