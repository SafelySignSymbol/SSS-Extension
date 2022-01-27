import { Transaction } from 'symbol-sdk'

export {}
console.log('INJECT')

window.SSS = {
  setTransaction: (tx: Transaction) => {
    const serializedTx = tx.serialize()
  },
}
