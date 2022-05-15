import { getStorage, setStorage } from '.'

import { EncriptionMessage } from './../../model/EncriptionMessage'

export const setEncriptionMessage = (msg: string, pubkey: string) => {
  console.log('setMSG', msg)
  console.log('setPub', pubkey)
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
      console.log('em', em.encriptionMessage)
      resolve(em.encriptionMessage)
    })
  })
}
