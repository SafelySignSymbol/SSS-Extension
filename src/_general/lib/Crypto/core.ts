import { SECRET_KEY } from './../../utils/Config'
import CryptoJS from 'crypto-js'
import crypto from 'crypto'

const algorithm = 'aes-256-cbc'
const delimiter = '$'

const getKey = () => {
  const key = SECRET_KEY || ''
  return key
}
const getSeed = () => {
  const key = getKey()
  return Buffer.from(key).toString('base64').substring(0, 32)
}

const encrypting = (value: string, iv: Buffer) => {
  const seed = getSeed()
  const cipher = crypto.createCipheriv(algorithm, seed, iv)
  const encrypted =
    cipher.update(value, 'utf8', 'base64') + cipher.final('base64')
  return encrypted
}

export const getEncriptedPrivateKey = (
  value: string,
  iv: Buffer,
  password: string
) => {
  const k = encrypting(value, iv)
  const ivWithEncrypted = iv.toString('base64') + delimiter + k

  return CryptoJS.AES.encrypt(ivWithEncrypted, password).toString()
}

const decrypting = (value: string, iv: string) => {
  const seed = getSeed()
  const decipher = crypto.createDecipheriv(
    algorithm,
    seed,
    Buffer.from(iv, 'base64')
  )
  const decrypted =
    decipher.update(value, 'base64', 'utf8') + decipher.final('utf8')
  return decrypted
}

export const decriptPrivateKey = (encryptedValue: string, password: string) => {
  const tmp = CryptoJS.AES.decrypt(encryptedValue, password).toString(
    CryptoJS.enc.Utf8
  )
  const [iv, encrypted] = tmp.split(delimiter)

  const k = decrypting(encrypted, iv)

  return k
}
