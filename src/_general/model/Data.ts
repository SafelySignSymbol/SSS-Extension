export type Data = {
  tabId: number
  dataType: string
  transaction?: string
  message?: {
    msg: string
    publicKey: string
  }
  createdAt: number
}

export const TRANSACTION = 'TRANSACTION'
export const MESSAGE = 'MESSAGE'
