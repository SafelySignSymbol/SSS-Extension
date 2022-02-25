import CryptoJS from 'crypto-js'

export const encrypt = (value: string, password: string) => {
  return CryptoJS.AES.encrypt(value, password).toString()
}

export const decrypt = (encryptedValue: string, password: string) => {
  return CryptoJS.AES.decrypt(encryptedValue, password).toString(
    CryptoJS.enc.Utf8
  )
}
