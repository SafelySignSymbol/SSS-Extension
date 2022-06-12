import { getStorage, setStorage } from '.'
import { Data, MESSAGE, TRANSACTION } from '../../model/Data'

export const getData = (): Promise<Data> => {
  return new Promise((resolve) => {
    getStorage('data').then((data) => resolve(data as Data))
  })
}

export const removeData = () => {
  setStorage({ data: null })
}

export const setTransactionV2 = (tx: string, tabId: number) => {
  const data: Data = {
    tabId,
    dataType: TRANSACTION,
    transaction: tx,
    createdAt: new Date().getTime(),
  }
  setStorage({ data })
}

export const setMessageV2 = (
  message: string,
  publicKey: string,
  tabId: number
) => {
  const data: Data = {
    tabId,
    dataType: MESSAGE,
    message: {
      msg: message,
      publicKey,
    },
    createdAt: new Date().getTime(),
  }
  setStorage({ data })
}
