import { RefObject } from 'react'

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
