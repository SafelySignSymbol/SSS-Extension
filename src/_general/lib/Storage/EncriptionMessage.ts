import { getStorage, setStorage } from '.'

import { EncriptionMessage } from './../../model/EncriptionMessage'

export const setEncriptionMessage = (msg: string, pubkey: string) => {
  setStorage({
    encriptionMessage: {
      message: msg,
      pubkey: pubkey,
    },
  })
}

export const getEncriptionMessage = (): Promise<EncriptionMessage> => {
  return new Promise((resolve) => {
    getStorage('encriptionMessage').then((enMsg) => {
      const em = enMsg as {
        encriptionMessage: EncriptionMessage
      }
      resolve(em.encriptionMessage)
    })
  })
}
