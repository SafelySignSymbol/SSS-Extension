import {
  SECRET_KEY0,
  SECRET_KEY1,
  SECRET_KEY2,
  SECRET_KEY3,
  SECRET_KEY4,
  SECRET_KEY5,
  SECRET_KEY6,
  SECRET_KEY7,
  SECRET_KEY8,
  SECRET_KEY9,
} from '../../utils/Config'

import CryptoJS from 'crypto-js'
import crypto from 'crypto'

const algorithm = 'aes-256-cbc'
const delimiter = '$'

const getSecret = (i: string) => {
  switch (i) {
    case '1':
      return SECRET_KEY1
    case '2':
      return SECRET_KEY2
    case '3':
      return SECRET_KEY3
    case '4':
      return SECRET_KEY4
    case '5':
      return SECRET_KEY5
    case '6':
      return SECRET_KEY6
    case '7':
      return SECRET_KEY7
    case '8':
      return SECRET_KEY8
    case '9':
      return SECRET_KEY9
    default:
      return SECRET_KEY0
  }
}

const encrypting = (value: string, seed: string, iv: Buffer) => {
  const cipher = crypto.createCipheriv(algorithm, getSecret(seed), iv)
  const encrypted =
    cipher.update(value, 'utf8', 'base64') + cipher.final('base64')
  return encrypted
}

export const getEncriptedPrivateKey = (
  value: string,
  seed: string[],
  iv: Buffer,
  password: string
) => {
  const tmp0 = encrypting(value, seed[0], iv)
  const tmp1 = encrypting(tmp0, seed[1], iv)
  const tmp2 = encrypting(tmp1, seed[2], iv)
  const ivWithEncrypted = iv.toString('base64') + delimiter + tmp2

  return CryptoJS.AES.encrypt(ivWithEncrypted, password).toString()
}

const decrypting = (value: string, seed: string, iv: string) => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    getSecret(seed),
    Buffer.from(iv, 'base64')
  )
  const decrypted =
    decipher.update(value, 'base64', 'utf8') + decipher.final('utf8')
  return decrypted
}

export const decriptPrivateKey = (
  seed: string[],
  encryptedValue: string,
  password: string
) => {
  const tmp = CryptoJS.AES.decrypt(encryptedValue, password).toString(
    CryptoJS.enc.Utf8
  )
  const [iv, encrypted] = tmp.split(delimiter)

  const tmp2 = decrypting(encrypted, seed[2], iv)
  const tmp1 = decrypting(tmp2, seed[1], iv)
  const tmp0 = decrypting(tmp1, seed[0], iv)

  return tmp0
}
