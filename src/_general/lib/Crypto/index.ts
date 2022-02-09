import CryptoJS from 'crypto-js'
import crypto from 'crypto'

const key =
  process.env.REACT_APP_PUBLIC_KEY || '01234567890123456789012345678901' // 256bit secret public key

const algorithm = 'aes-256-cbc'
const delimiter = '$'

export const encrypt = (value: string, password: string) => {
  const iv = crypto.randomBytes(16)

  const cipher = crypto.createCipheriv(algorithm, key, iv)
  const encrypted =
    cipher.update(value, 'utf8', 'base64') + cipher.final('base64')
  const ivWithEncrypted = iv.toString('base64') + delimiter + encrypted

  return CryptoJS.AES.encrypt(ivWithEncrypted, password).toString()
}

export const decrypt = (encryptedValue: string, password: string) => {
  const tmp = CryptoJS.AES.decrypt(encryptedValue, password).toString(
    CryptoJS.enc.Utf8
  )

  const [iv, encrypted] = tmp.split(delimiter)
  const decipher = crypto.createDecipheriv(
    algorithm,
    key,
    Buffer.from(iv, 'base64')
  )
  const decrypted =
    decipher.update(encrypted, 'base64', 'utf8') + decipher.final('utf8')
  return decrypted
}
