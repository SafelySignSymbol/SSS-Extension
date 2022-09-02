import { RefObject } from 'react'

import { decrypt } from '../Crypto'
import { Account, NetworkType } from 'symbol-sdk'

const ADDRESS_PATTERN = /[A-Z0-9]{39}/
const PRIKEY_PATTERN = /[A-F0-9]{64}/

export const validateRef = (
  ref: RefObject<HTMLInputElement>,
  f?: (s: string) => string
): string => {
  if (ref === null || ref.current === null) return ''
  if (f === undefined) return ref.current.value
  return f(ref.current.value)
}

export const validateAddress = (address: string): string => {
  if (
    address.trim().toUpperCase().replace(/-/g, '').length === 39 &&
    ADDRESS_PATTERN.test(address)
  ) {
    return address
  }
  return ''
}

export const validatePrivateKey = (priKey: string): string => {
  if (priKey.length === 64 && PRIKEY_PATTERN.test(priKey)) {
    return priKey
  }
  return ''
}

export const checkPassword = (
  encriptedPrivateKey: string,
  pass: string,
  address: string
): boolean => {
  try {
    const priKey = decrypt(encriptedPrivateKey, pass)
    const net_type =
      address.charAt(0) === 'T' ? NetworkType.TEST_NET : NetworkType.MAIN_NET

    const addr = Account.createFromPrivateKey(priKey, net_type).address.plain()

    if (addr === address) {
      return true
    } else {
      return false
    }
  } catch (e) {
    console.error(e)
    return false
  }
}
