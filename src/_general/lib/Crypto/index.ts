import { decriptPrivateKey, getEncriptedPrivateKey } from './core'
import crypto from 'crypto'

export const encrypt = (value: string, password: string) => {
  const iv = crypto.randomBytes(16)
  return getEncriptedPrivateKey(value, iv, password)
}

export const decrypt = (encryptedValue: string, password: string) => {
  return decriptPrivateKey(encryptedValue, password)
}
