import { decriptPrivateKey, getEncriptedPrivateKey } from './core'
import crypto from 'crypto'

export const encrypt = (value: string, password: string, seed: number) => {
  const iv = crypto.randomBytes(16)
  return getEncriptedPrivateKey(value, Array.from(String(seed)), iv, password)
}

export const decrypt = (
  encryptedValue: string,
  password: string,
  seed: number
) => {
  return decriptPrivateKey(Array.from(String(seed)), encryptedValue, password)
}
